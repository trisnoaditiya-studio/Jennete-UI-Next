"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/icons";
import PostCard from "@/components/ui/PostCard";
import { CATEGORIES, fdate, type Article } from "@/lib/articles";
import { useSearch } from "@/lib/client";

const STEP = 6;

/* Daftar artikel: filter kategori (tersinkron ke ?kategori=), artikel utama, grid 6 kartu + "Muat lebih banyak" */
export default function ArticleList({ articles }: { articles: Article[] }) {
  const [kat, setKat] = useState("");
  const [limit, setLimit] = useState(STEP);
  const [firstNew, setFirstNew] = useState<string | null>(null);
  const [animFrom, setAnimFrom] = useState<number | null>(null);
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* kategori dari ?kategori= (juga saat kembali lewat tombol Back) */
  const search = useSearch();
  const [applied, setApplied] = useState<string | null>(null);
  if (search !== null && search !== applied) {
    setApplied(search);
    const q = new URLSearchParams(search).get("kategori");
    setKat(q && CATEGORIES.includes(q) ? q : "");
  }

  const pick = (k: string) => {
    setKat(k);
    setLimit(STEP);
    setAnimFrom(null);
    const p = new URLSearchParams(window.location.search);
    if (k) p.set("kategori", k);
    else p.delete("kategori");
    const s = p.toString();
    window.history.replaceState(null, "", window.location.pathname + (s ? "?" + s : ""));
  };

  const [feat, ...rest] = articles;
  const featShown = !kat || feat.kategori === kat;
  const matching = rest.filter((a) => !kat || a.kategori === kat);
  const shown = matching.slice(0, limit);

  /* setelah "Muat lebih banyak": gulir halus ke kartu pertama yang baru */
  useEffect(() => {
    if (!firstNew) return;
    const el = refs.current[firstNew];
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
    el.focus({ preventScroll: true });
    setFirstNew(null);
  }, [firstNew]);

  const more = () => {
    const next = matching[limit];
    setAnimFrom(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : limit);
    setLimit(limit + STEP);
    if (next) setFirstNew(next.slug);
  };

  return (
    <section className="ar-list" aria-label="Daftar artikel">
      <div className="wrap">
        <fieldset className="ls-group">
          <legend className="sr-only">Kategori</legend>
          <span className="ls-lab" aria-hidden="true">
            Kategori
          </span>
          <div className="fm-chips">
            {["", ...CATEGORIES].map((c) => (
              <label key={c || "semua"}>
                <input type="radio" name="kategori" value={c} autoComplete="off" checked={kat === c} onChange={() => pick(c)} />
                <span>{c || "Semua"}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <Link className="ar-feature" href={`/artikel/${feat.slug}/`} hidden={!featShown}>
          <div className="pic">
            <img src={feat.img} alt="" />
          </div>
          <div>
            <span className="ar-flag">Artikel terbaru</span>
            <div className="ar-meta">
              <span className="ar-cat">{feat.kategori}</span>
              <time dateTime={feat.date}>{fdate(feat.date)}</time>
              <span className="ar-draft">Draf, perlu ditinjau</span>
            </div>
            <h2>{feat.title}</h2>
            <p>{feat.excerpt}</p>
            <span className="btn btn-dark">
              Baca artikel
              <Arrow />
            </span>
          </div>
        </Link>
        <div className="posts">
          {shown.map((a, i) => (
            <PostCard
              a={a}
              key={a.slug}
              isNew={animFrom !== null && i >= animFrom}
              refEl={(el) => {
                refs.current[a.slug] = el;
              }}
            />
          ))}
        </div>
        <p className="ar-empty" hidden={shown.length > 0 || featShown}>
          Belum ada artikel di kategori ini.
        </p>
        <div className="ar-more">
          <button className="btn btn-outline" type="button" hidden={matching.length <= limit} onClick={more}>
            Muat lebih banyak
          </button>
        </div>
      </div>
    </section>
  );
}
