import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Ic } from "@/components/icons";
import SvcShowcase from "@/components/home/SvcShowcase";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import HowSteps from "@/components/sections/HowSteps";
import IncList from "@/components/sections/IncList";
import Proof from "@/components/sections/Proof";
import SbHero, { posClass } from "@/components/sections/SbHero";
import Trust from "@/components/sections/Trust";
import FleetCard from "@/components/ui/FleetCard";
import QuoteButton from "@/components/ui/QuoteButton";
import { faqFor } from "@/lib/faqs";
import { UNITS } from "@/lib/fleet";
import { EMERGENCY } from "@/lib/site";
import { getSolution, SOLUTIONS, type Solution } from "@/lib/solutions";

export const dynamicParams = false;
export const generateStaticParams = () => SOLUTIONS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSolution((await params).slug);
  return s ? s.meta : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const h = s.hero;
  return (
    <>
      <SbHero
        variant="sub"
        titleId="sb-title"
        img={`/assets/img/site/${h.img}.jpg`}
        pos={h.pos}
        crumbs={[["Beranda", "/"], ["Solusi Bisnis", "/solusi-bisnis/"], [s.name]]}
        chip={h.chip}
        title={h.title}
        sub={h.sub}
        cta={
          <>
            <QuoteButton />
            {h.cta2}
          </>
        }
        facts={h.facts}
      />
      <Trust />
      {s.feature && <Feature f={s.feature} />}
      {s.fleet && <FleetPicks {...s.fleet} />}
      {s.sections.map((k) =>
        k === "inc" ? (
          <IncList key={k} title="Sudah termasuk dalam kontrak" />
        ) : k === "how" ? (
          <HowSteps key={k} />
        ) : k === "proof" ? (
          <Proof key={k} />
        ) : k === "svc" ? (
          <SvcShowcase
            key={k}
            title="Tiga layanan dalam setiap kontrak"
            alts={["Teknisi memeriksa unit di bengkel", "Unit di depan bengkel resmi", "Petugas membantu unit yang mogok di jalan"]}
          />
        ) : (
          <Sos key={k} />
        ),
      )}
      <FaqSection title={s.faqTitle} items={faqFor(s.slug)} />
      <OtherSolutions here={s.slug} />
      <CtaBand title={s.cta[0]} text={s.cta[1]} />
    </>
  );
}

/* foto + 3 poin ber-ikon, lalu kartu "Cocok untuk" bergambar */
function Feature({ f }: { f: NonNullable<Solution["feature"]> }) {
  return (
    <section aria-labelledby="intro-title">
      <div className="wrap">
        <div className="sf-grid">
          <figure className="sf-pic">
            <img src={`/assets/img/${f.img}`} alt={f.alt} loading="lazy" className={posClass(f.pos)} />
            <figcaption className="svc-stat">
              <strong>{f.stat[0]}</strong>
              <span>{f.stat[1]}</span>
            </figcaption>
          </figure>
          <div className="sf-body">
            <h2 id="intro-title">{f.title}</h2>
            <p className="lead">{f.lead}</p>
            <ul className="sf-bens">
              {f.bens.map(([icon, t, d]) => (
                <li key={t}>
                  <span className="hl-ic" aria-hidden="true">
                    <Ic name={icon} sw={1.7} />
                  </span>
                  <b>{t}</b>
                  <small>{d}</small>
                </li>
              ))}
            </ul>
            {f.more}
          </div>
        </div>
        <div className="sf-uses">
          <h3>{f.uses.title}</h3>
          <p>{f.uses.lead}</p>
          <ul className="sf-cards">
            {f.uses.items.map(([src, t, d]) => (
              <li className="rv" key={t}>
                <img src={`/assets/img/${src}`} alt="" loading="lazy" />
                <b>{t}</b>
                <small>{d}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FleetPicks({ ids, title, lead }: { ids: string[]; title: string; lead: string }) {
  return (
    <section className="sec-soft" id="armada" aria-labelledby="fleet-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 id="fleet-title">{title}</h2>
            <p className="lead">{lead}</p>
          </div>
          <Link className="btn btn-outline" href="/armada/">
            Lihat semua armada
          </Link>
        </div>
        <div className="sim-grid">
          {ids.map((id) => {
            const u = UNITS.find((x) => x.id === id)!;
            return <FleetCard u={u} key={id} tags={u.premium ? [u.kategori] : [u.bb, u.kategori]} />;
          })}
        </div>
      </div>
    </section>
  );
}

function Sos() {
  return (
    <section className="sec-soft" aria-labelledby="sos-title">
      <div className="wrap sol-sos">
        <div>
          <h2 id="sos-title">Unit bermasalah di jalan?</h2>
          <p className="lead">Simpan nomor darurat ini di ponsel pengemudi dan tim Anda. Tim kami siaga 24 jam.</p>
          <ul className="ticks">
            <li>Mogok atau kecelakaan: hubungi tim kami, kami datang ke lokasi</li>
            <li>Di luar Jakarta: bawa unit ke bengkel resmi merek terkait terdekat</li>
            <li>Jadwal servis berikutnya diingatkan oleh tim kami</li>
          </ul>
        </div>
        <div className="mega-card bgcard sos">
          <span className="sos-ic" aria-hidden="true">
            <Ic name="phone" />
          </span>
          <h3>Bantuan darurat 24/7</h3>
          <p>Telepon atau WhatsApp tim darurat Jennete Rent.</p>
          <span className="sos-live">
            <i aria-hidden="true"></i>Siaga 24 jam
          </span>
          <a className="btn btn-white" href={`tel:${EMERGENCY.tel}`}>
            Telepon {EMERGENCY.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function OtherSolutions({ here }: { here: string }) {
  return (
    <section className="sec-soft" aria-labelledby="other-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 id="other-title">Solusi lainnya</h2>
            <p className="lead">Satu mitra untuk seluruh kebutuhan kendaraan perusahaan.</p>
          </div>
          <Link className="btn btn-outline" href="/solusi-bisnis/#banding">
            Bandingkan semua solusi
          </Link>
        </div>
        <div className="sol-other">
          {SOLUTIONS.filter((o) => o.slug !== here).map((o) => (
            <Link className="sol-col rv" href={`/solusi-bisnis/${o.slug}/`} key={o.slug}>
              <div className="sol-thumb">
                <img src={`/assets/img/site/${o.card[1]}.jpg`} alt="" loading="lazy" />
              </div>
              <h3>{o.name}</h3>
              <p>{o.card[0]}</p>
              <span className="link">
                Pelajari
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
