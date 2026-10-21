import type { Metadata } from "next";
import Link from "next/link";
import { Ic } from "@/components/icons";
import { HelpFaq, HelpSearchBox, HelpSearchProvider } from "@/components/help/HelpCenter";
import CtaBand from "@/components/sections/CtaBand";
import HowSteps from "@/components/sections/HowSteps";
import SbHero from "@/components/sections/SbHero";
import { DOC_COMPANY, DOC_PERSON, HELP_GROUPS } from "@/lib/help";
import { EMERGENCY, WA_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bantuan & FAQ | Jennete Rent",
  description: "Pusat bantuan Jennete Rent: pertanyaan umum seputar harga, durasi kontrak, sopir, dokumen, servis berkala, dan bantuan darurat 24/7.",
};

const CARDS: [string, string, string, string, boolean?][] = [
  ["#faq", "help", "Pertanyaan umum", "Harga, durasi, dan layanan"],
  ["#cara-sewa", "steps", "Cara sewa", "Empat langkah sampai unit diantar"],
  ["#dokumen", "doc2", "Dokumen", "Perusahaan dan perorangan"],
  ["/solusi-bisnis/layanan-purna-sewa/", "cal2", "Servis dan bengkel", "Tiap 10.000 km atau 6 bulan"],
  ["/tentang-kami/#kontak", "pin", "Kontak dan lokasi", "Alamat, telepon, jam kantor"],
  [`tel:${EMERGENCY.tel}`, "phone", "Bantuan darurat 24/7", EMERGENCY.label, true],
];

const Ticks = ({ items }: { items: string[] }) => (
  <ul className="ticks">
    {items.map((x) => (
      <li key={x}>
        <span>{x}</span>
      </li>
    ))}
  </ul>
);

export default function Bantuan() {
  return (
    <HelpSearchProvider>
      <SbHero
        className="bt-hero"
        img="/assets/img/site/hero-bantuan.webp"
        crumbs={[["Beranda", "/"], ["Bantuan"]]}
        title="Ada yang bisa kami bantu?"
        sub="Temukan jawaban seputar harga, dokumen, perawatan unit, dan cara memesan."
      >
        <HelpSearchBox />
        <div className="bt-topics">
          {HELP_GROUPS.map((g) => (
            <a href={`#topik-${g.key}`} key={g.key}>
              {g.title}
            </a>
          ))}
        </div>
      </SbHero>
      <section className="sec-soft bt-pintas" aria-labelledby="pintas-title">
        <div className="wrap">
          <h2 className="sr-only" id="pintas-title">
            Topik bantuan
          </h2>
          <ul className="bt-cards">
            {CARDS.map(([href, icon, t, d, sos]) => {
              const inner = (
                <>
                  <span className="hl-ic" aria-hidden="true">
                    <Ic name={icon} sw={1.7} />
                  </span>
                  <b>{t}</b>
                  <small>{d}</small>
                </>
              );
              return (
                <li key={t}>
                  {href.startsWith("/") ? (
                    <Link href={href}>{inner}</Link>
                  ) : (
                    <a href={href} className={sos ? "sos" : undefined}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <HelpFaq />
      <HowSteps docsHref="#dokumen" />
      <section id="dokumen" aria-labelledby="dok-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="dok-title">Dokumen yang perlu disiapkan</h2>
              <p className="lead">Siapkan dokumen berikut agar proses verifikasi berjalan lancar.</p>
            </div>
            <Link className="btn btn-dark" href="/pesan/">
              Pesan kendaraan
            </Link>
          </div>
          <div className="bt-docs">
            <div>
              <h3>
                <span className="hl-ic" aria-hidden="true">
                  <Ic name="building" sw={1.7} />
                </span>
                Perusahaan / instansi
              </h3>
              <Ticks items={DOC_COMPANY} />
              <p className="bt-note">Tim kami juga melakukan survei lokasi domisili.</p>
            </div>
            <div>
              <h3>
                <span className="hl-ic" aria-hidden="true">
                  <Ic name="person" sw={1.7} />
                </span>
                Perorangan
              </h3>
              <Ticks items={DOC_PERSON} />
            </div>
          </div>
        </div>
      </section>
      <CtaBand
        title="Masih ada pertanyaan?"
        text="Tim kami siap membantu di jam kantor, Senin–Jumat 08.00–18.00 dan Sabtu 08.00–15.00."
        primary={
          <a className="btn btn-white" href={WA_URL} target="_blank" rel="noopener">
            Tanya lewat WhatsApp
          </a>
        }
      />
    </HelpSearchProvider>
  );
}
