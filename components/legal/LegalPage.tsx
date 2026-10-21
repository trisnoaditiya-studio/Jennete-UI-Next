import Link from "next/link";
import { Arrow } from "@/components/icons";
import Crumb from "@/components/ui/Crumb";
import { LEGAL_UPDATED, legalId } from "@/lib/legal";
import LegalToc from "./LegalToc";

/* Template Syarat & Ketentuan / Kebijakan Privasi: isi bernomor + daftar isi lengket */
export default function LegalPage({
  title,
  intro,
  sections,
  other,
}: {
  title: string;
  intro: string;
  sections: [string, string][];
  other: [string, string];
}) {
  const body = sections.map(([h, html], i) => `<h2 id="${legalId(h)}"><span class="num">${i + 1}.</span> ${h}</h2>${html}`).join("");
  return (
    <>
      <header className="ar-head lg-head">
        <div className="wrap">
          <Crumb dark items={[["Beranda", "/"], ["Bantuan", "/bantuan/"], [title]]} />
          <h1 id="pg-title">{title}</h1>
          <p className="lead">{intro}</p>
          <div className="ar-meta">
            <span>Terakhir diperbarui {LEGAL_UPDATED}</span>
            <span className="ar-draft">Draf, perlu ditinjau legal</span>
          </div>
        </div>
      </header>
      <section className="lg-body" aria-labelledby="pg-title">
        <div className="wrap ar-layout">
          <div className="prose lg-prose" dangerouslySetInnerHTML={{ __html: body }} />
          <aside className="ar-aside">
            <LegalToc items={sections.map(([h]) => [legalId(h), h])} />
            <div className="lg-other">
              <b>Dokumen terkait</b>
              <Link className="link" href={other[0]}>
                {other[1]}
                <Arrow />
              </Link>
              <Link className="link" href="/bantuan/">
                Pusat bantuan
                <Arrow />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
