"use client";

import { Children, createContext, isValidElement, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearch } from "@/lib/client";
import { Ic } from "@/components/icons";
import useScrollSpy from "@/components/ui/useScrollSpy";
import { HELP_GROUPS, HELP_TOTAL, helpFaq } from "@/lib/help";
import { WA_URL } from "@/lib/site";

/* teks polos dari jawaban (string atau JSX) untuk pencarian */
function nodeText(n: ReactNode): string {
  if (n == null || typeof n === "boolean") return "";
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(n)) return Children.toArray(n.props.children).map(nodeText).join("");
  return "";
}
const norm = (x: string) => x.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const Ctx = createContext<{ q: string; setQ: (v: string) => void }>({ q: "", setQ: () => {} });

/* Pusat bantuan: kotak cari di hero dan daftar FAQ berbagi state pencarian */
export function HelpSearchProvider({ children }: { children: ReactNode }) {
  const [q, setQ] = useState("");
  /* kata kunci dari ?q= (sekali setelah hidrasi) */
  const search = useSearch();
  const [prefilled, setPrefilled] = useState(false);
  if (search !== null && !prefilled) {
    setPrefilled(true);
    const v = new URLSearchParams(search).get("q");
    if (v) setQ(v);
  }
  return <Ctx.Provider value={{ q, setQ }}>{children}</Ctx.Provider>;
}

export function HelpSearchBox() {
  const { q, setQ } = useContext(Ctx);
  return (
    <label className="bt-search">
      <span className="sr-only">Cari pertanyaan</span>
      <Ic name="search" sw={1.7} />
      <input type="search" placeholder="Cari, mis. sopir, dokumen, servis" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
    </label>
  );
}

export function HelpFaq() {
  const { q } = useContext(Ctx);
  const words = norm(q.trim()).split(/\s+/).filter(Boolean);
  const groups = useMemo(
    () =>
      HELP_GROUPS.map((g) => ({
        ...g,
        items: g.items.map((k) => {
          const [question, answer] = helpFaq(k);
          return { k, question, answer, text: norm(question + " " + nodeText(answer)) };
        }),
      })),
    [],
  );
  const match = (t: string) => !words.length || words.every((w) => t.includes(w));
  const visibleGroups = groups.filter((g) => g.items.some((it) => match(it.text)));
  const n = groups.reduce((s, g) => s + g.items.filter((it) => match(it.text)).length, 0);
  const firstKey = words.length ? groups.flatMap((g) => g.items).find((it) => match(it.text))?.k : undefined;
  const details = useRef<Record<string, HTMLDetailsElement | null>>({});
  useEffect(() => {
    if (firstKey && details.current[firstKey]) details.current[firstKey]!.open = true;
  }, [firstKey]);

  const active = useScrollSpy(visibleGroups.map((g) => `topik-${g.key}`));

  return (
    <section className="faq-sec" id="faq" aria-labelledby="faq-title">
      <div className="wrap bt-faq">
        <div className="bt-faq-side">
          <h2 id="faq-title">Pertanyaan umum</h2>
          <p className="lead">{HELP_TOTAL} pertanyaan yang paling sering kami terima.</p>
          <nav aria-label="Topik pertanyaan">
            {HELP_GROUPS.map((g) => {
              const on = active === `topik-${g.key}`;
              return (
                <a href={`#topik-${g.key}`} key={g.key} className={on ? "is-active" : undefined} aria-current={on ? "true" : undefined}>
                  {g.title}
                </a>
              );
            })}
          </nav>
        </div>
        <div>
          <p className="ls-count" aria-live="polite">
            {words.length ? `${n} jawaban ditemukan` : ""}
          </p>
          {groups.map((g) => (
            <div className="bt-group" key={g.key} hidden={!visibleGroups.includes(g)}>
              <h3 id={`topik-${g.key}`}>{g.title}</h3>
              <div className="faq-list">
                {g.items.map((it) => (
                  <details
                    name="faq"
                    key={it.k}
                    hidden={!match(it.text)}
                    ref={(el) => {
                      details.current[it.k] = el;
                    }}
                  >
                    <summary>{it.question}</summary>
                    <div className="ans">{it.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
          <div className="bt-empty" hidden={n > 0}>
            <b>Belum ada jawaban yang cocok</b>
            <p>Coba kata lain, atau tanyakan langsung ke tim kami.</p>
            <a className="btn btn-wa" href={WA_URL} target="_blank" rel="noopener">
              Tanya lewat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
