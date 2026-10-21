import type { ReactNode } from "react";
import { Ic } from "@/components/icons";
import Crumb from "@/components/ui/Crumb";

/* posisi fokus foto (object-position) → kelas CSS .op-* di styles/style.css */
export const posClass = (pos?: string) => (pos ? "op-" + pos.replace(/%/g, "").replace(/\s+/g, "-") : undefined);

/* Hero foto gelap untuk halaman dalam.
   variant "sub"  = halaman Solusi (fakta teks .sol-facts)
   variant "ls"   = halaman listing/lainnya (tone ungu, kartu fakta ber-ikon) */
export default function SbHero({
  variant = "ls",
  className = "",
  img,
  pos,
  crumbs,
  chip,
  titleId = "pg-title",
  title,
  sub,
  cta,
  facts,
  factCards,
  children,
}: {
  variant?: "sub" | "ls";
  className?: string;
  img: string;
  pos?: string;
  crumbs: [string, string?][];
  chip?: string;
  titleId?: string;
  title: ReactNode;
  sub: ReactNode;
  cta?: ReactNode;
  facts?: [string, string][];
  factCards?: [string | ReactNode, string, string][]; // ikon: nama Ic atau elemen
  children?: ReactNode;
}) {
  return (
    <section className={`sb-hero sub${variant === "ls" ? " ls" : ""}${className ? " " + className : ""}`} aria-labelledby={titleId}>
      <div className="sb-media">
        <img src={img} alt="" fetchPriority="high" className={posClass(pos)} />
      </div>
      <div className="sb-scrim" aria-hidden="true"></div>
      <div className="wrap sb-hero-in">
        <Crumb items={crumbs} />
        {chip && <span className="chip-who">{chip}</span>}
        <h1 id={titleId}>{title}</h1>
        <p className="sub">{sub}</p>
        {cta && <div className="hero-cta">{cta}</div>}
        {facts && (
          <ul className="sol-facts">
            {facts.map(([a, b]) => (
              <li key={a}>
                <strong>{a}</strong>
                {b}
              </li>
            ))}
          </ul>
        )}
        {factCards && (
          <ul className="fact-cards">
            {factCards.map(([icon, a, b]) => (
              <li key={a}>
                <span className="ic" aria-hidden="true">
                  {typeof icon === "string" ? <Ic name={icon} /> : icon}
                </span>
                <div>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </section>
  );
}
