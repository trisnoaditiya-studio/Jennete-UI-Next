"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useSearch } from "@/lib/client";
import FleetCard from "@/components/ui/FleetCard";
import type { Unit } from "@/lib/fleet";

/* opsi chip: value, atau [value, goto] bila nilai itu ditangani halaman lain */
export type ChipOpt = string | [string, string];
export type ListingConfig = {
  seg: "all" | "mobil" | "motor";
  kats?: ChipOpt[];
  katAll?: string; // chip "Semua" kategori pindah ke halaman ini
  katDefault?: string;
  bbs?: ChipOpt[];
  showKat?: boolean;
  showBb?: boolean;
  note: string;
  alt?: [string, string]; // [href, label] tombol saat hasil kosong
  ph?: string;
};

const SEG: [ListingConfig["seg"], string, string][] = [
  ["all", "Semua", "/armada/"],
  ["mobil", "Mobil", "/armada/mobil/"],
  ["motor", "Motor", "/armada/motor/"],
];
const norm = (o: ChipOpt): [string, string | undefined] => (typeof o === "string" ? [o, undefined] : o);
const J: Record<string, number> = { mobil: 0, motor: 1 };

/* Listing armada: filter kategori + bahan bakar + urutan, tersinkron ke URL (?kategori=&bb=&urut=).
   Chip ber-goto pindah halaman (mis. Listrik → /armada/mobil/listrik/) dengan filter lain ikut dibawa. */
export default function FleetListing({ units, cfg }: { units: Unit[]; cfg: ListingConfig }) {
  const router = useRouter();
  const showKat = cfg.showKat ?? true;
  const showBb = cfg.showBb ?? true;
  const kats = useMemo(() => {
    if (cfg.kats) return cfg.kats.map(norm);
    const k: [string, string | undefined][] = ["MPV", "SUV", "City Car", "Sedan", "Matic", "Bebek"].filter((x) => units.some((u) => u.kategori === x)).map((x) => [x, undefined]);
    if (showKat && units.some((u) => u.premium) && !units.every((u) => u.premium)) k.push(["Premium", undefined]);
    return k;
  }, [cfg.kats, units, showKat]);
  const bbs = useMemo(
    () => (cfg.bbs ? cfg.bbs.map(norm) : (["Listrik", "PHEV", "Bensin"].filter((x) => units.some((u) => u.bb === x)).map((x) => [x, undefined]) as [string, string | undefined][])),
    [cfg.bbs, units],
  );
  const DEF = { kategori: cfg.katDefault ?? "", bb: "" };
  const priced = units.some((u) => u.price);

  const [kategori, setKategori] = useState(DEF.kategori);
  const [bb, setBb] = useState("");
  const [urut, setUrut] = useState("");

  /* filter dari URL (hanya nilai yang ditangani halaman ini), juga saat kembali lewat tombol Back */
  const search = useSearch();
  const [applied, setApplied] = useState<string | null>(null);
  if (search !== null && search !== applied) {
    setApplied(search);
    const q = new URLSearchParams(search);
    const ok = (opts: [string, string | undefined][], v: string | null) => !!v && opts.some(([x, go]) => x === v && !go);
    setKategori(ok(kats, q.get("kategori")) ? q.get("kategori")! : DEF.kategori);
    setBb(ok(bbs, q.get("bb")) ? q.get("bb")! : "");
    setUrut(q.get("urut") || "");
  }

  const writeUrl = (k: string, b: string, u: string) => {
    const p = new URLSearchParams(window.location.search);
    (
      [
        ["kategori", k !== DEF.kategori ? k : ""],
        ["bb", b],
        ["urut", u],
      ] as const
    ).forEach(([x, v]) => (v ? p.set(x, v) : p.delete(x)));
    const s = p.toString();
    window.history.replaceState(null, "", window.location.pathname + (s ? "?" + s : ""));
  };

  const choose = (name: "kategori" | "bb", value: string, goto?: string) => {
    if (goto) {
      const p = new URLSearchParams();
      const cur = { kategori, bb };
      (["kategori", "bb"] as const).forEach((n) => {
        const v = n === name ? value : cur[n];
        if ((v && v !== DEF[n]) || (n === name && v)) p.set(n, v);
      });
      if (urut) p.set("urut", urut);
      router.push(goto + (p.toString() ? "?" + p : ""));
      return;
    }
    const k = name === "kategori" ? value : kategori;
    const b = name === "bb" ? value : bb;
    if (name === "kategori") setKategori(value);
    else setBb(value);
    writeUrl(k, b, urut);
  };

  const shown = useMemo(() => {
    const ok = units.filter((c) => (!kategori || c.kategori === kategori || (kategori === "Premium" && c.premium)) && (!bb || c.bb === bb));
    if (!urut) return ok;
    /* harga mobil (per hari) & motor (per minggu) tidak dibandingkan: urut per jenis dulu */
    return [...ok].sort((a, c) => {
      const j = (J[a.jenis] || 0) - (J[c.jenis] || 0);
      if (j) return j;
      const pa = a.price || Infinity,
        pc = c.price || Infinity;
      return urut === "harga-turun" ? (pc === Infinity ? -1 : pc) - (pa === Infinity ? -1 : pa) : pa - pc;
    });
  }, [units, kategori, bb, urut]);

  const reset = () => {
    setKategori(DEF.kategori);
    setBb("");
    setUrut("");
    writeUrl(DEF.kategori, "", "");
  };

  const kk = kategori !== DEF.kategori ? kategori : "";
  const altShow = cfg.alt && shown.length === 0 && (kk || bb);
  const altQ = new URLSearchParams();
  if (kk) altQ.set("kategori", kk);
  if (bb) altQ.set("bb", bb);

  const chips = (name: "kategori" | "bb", label: string, opts: [string, string | undefined][], value: string, allGoto?: string) =>
    opts.length < 2 ? null : (
      <fieldset className="ls-group">
        <legend className="sr-only">{label}</legend>
        <span className="ls-lab" aria-hidden="true">
          {label}
        </span>
        <div className="fm-chips">
          {([["", allGoto]] as [string, string | undefined][]).concat(opts).map(([v, go]) => (
            <label key={v || "semua"}>
              <input type="radio" name={name} value={v} autoComplete="off" checked={value === v} onChange={() => choose(name, v, go)} />
              <span>
                {v || "Semua"}
                {go && (
                  <>
                    <svg className="go" aria-hidden="true">
                      <use href="#i-arrow" />
                    </svg>
                    <span className="sr-only"> (buka halaman lain)</span>
                  </>
                )}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    );

  return (
    <section className="ls-sec" id="daftar" aria-labelledby="ls-title">
      <h2 className="sr-only" id="ls-title">
        Daftar unit
      </h2>
      <div className="ls-bar">
        <div className="wrap">
          <nav className="seg" aria-label="Jenis kendaraan">
            {SEG.map(([key, label, href]) => (
              <Link href={href} aria-current={key === cfg.seg ? "page" : undefined} key={key}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="ls-filters">
            {showKat && chips("kategori", "Kategori", kats, kategori, cfg.katAll)}
            {showBb && chips("bb", "Bahan bakar", bbs, bb)}
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="ls-meta">
          <p className="ls-count" aria-live="polite">
            <b>{shown.length}</b> unit ditampilkan
          </p>
          {priced && (
            <label className="ls-sort">
              Urutkan
              <select
                name="urut"
                autoComplete="off"
                value={urut}
                onChange={(e) => {
                  setUrut(e.target.value);
                  writeUrl(kategori, bb, e.target.value);
                }}
              >
                <option value="">Rekomendasi</option>
                <option value="harga-naik">Harga terendah</option>
                <option value="harga-turun">Harga tertinggi</option>
              </select>
            </label>
          )}
        </div>
        <div className="fleet-grid" hidden={shown.length === 0}>
          {shown.map((u) => (
            <FleetCard u={u} key={u.id} />
          ))}
        </div>
        <div className="ls-empty" hidden={shown.length > 0}>
          <h3>Belum ada unit yang cocok</h3>
          <p>Coba ubah filter, atau ceritakan kebutuhan Anda ke tim kami.</p>
          <div className="ls-empty-cta">
            {cfg.alt && (
              <Link className="btn btn-dark" href={`${cfg.alt[0]}?${altQ}`} hidden={!altShow}>
                Lihat {[kk, bb].filter(Boolean).join(" ")} {cfg.alt[1]}
              </Link>
            )}
            <button type="button" className="btn btn-outline" onClick={reset}>
              Reset filter
            </button>
          </div>
        </div>
        <p className="ls-note">{cfg.note}</p>
        {cfg.ph && <p className="ph-note">Perlu dilengkapi: {cfg.ph}</p>}
      </div>
    </section>
  );
}
