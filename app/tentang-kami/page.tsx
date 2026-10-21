import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Ic } from "@/components/icons";
import CtaBand from "@/components/sections/CtaBand";
import Proof from "@/components/sections/Proof";
import SbHero from "@/components/sections/SbHero";
import QuoteButton from "@/components/ui/QuoteButton";
import { ADDRESS, COMPANY, EMAIL, EMERGENCY, HOURS, PHONE_1, PHONE_2 } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami | Jennete Rent",
  description: "Jennete Rent (PT Roda Mandiri Jaya) melayani sewa mobil dan motor untuk perusahaan, instansi, dan perorangan di Jakarta sejak 2010. Terdaftar di e-Katalog LKPP.",
};

const VISI = "Menjadi perusahaan transportasi ataupun rekan kerja yang terpercaya untuk menyediakan jasa penyewaan mobil yang dapat diandalkan. Kami berupaya untuk menempatkan diri sebagai perusahaan rental mobil terdepan di kawasan Jakarta.";
const MISI = ["Kami selalu berusaha untuk menyediakan kendaraan yang terbaru dan optimal untuk perjalanan Anda.", "Kami akan membangun kinerja yang memuaskan untuk klien kami."];

const SOLS = [
  ["sewa-jangka-panjang", "cal", "Sewa jangka panjang", "Mobil dinas dan operasional"],
  ["operasional-sopir", "person", "Kendaraan + sopir", "Kebutuhan harian kantor"],
  ["pengadaan-instansi", "shield", "Pengadaan instansi", "Melalui e-Katalog LKPP"],
  ["layanan-purna-sewa", "wrench", "Layanan purna sewa", "Di setiap kontrak"],
];

const LEGAL: [string, React.ReactNode][] = [
  ["Badan usaha", COMPANY],
  ["Merek layanan", "Jennete Rent"],
  ["Beroperasi sejak", "2010"],
  ["Pengadaan pemerintah", "Terdaftar di e-Katalog LKPP"],
  ["NIB, NPWP, izin usaha", <span className="ph-note" key="ph">Perlu dilengkapi</span>],
];

const MAPS = "https://www.google.com/maps/search/?api=1&query=Jl.%20Pangeran%20Jayakarta%20No.%2073%20Jakarta";

export default function TentangKami() {
  return (
    <>
      <SbHero
        img="/assets/img/site/hero-armada.webp"
        pos="62% center"
        crumbs={[["Beranda", "/"], ["Tentang kami"]]}
        title="Mitra kendaraan perusahaan sejak 2010"
        sub="Jennete Rent melayani sewa mobil dan motor untuk perusahaan, instansi, dan perorangan di Jakarta dan sekitarnya."
        cta={
          <>
            <QuoteButton />
            <a className="btn btn-ghost-w" href="#kontak">
              Hubungi kami
            </a>
          </>
        }
        factCards={[
          ["cal", "Sejak 2010", "beroperasi di Jakarta"],
          ["grid", "120+ merek", "mobil dan motor"],
          ["shield", "e-Katalog LKPP", "penyedia terdaftar"],
        ]}
      />
      <section id="profil" aria-labelledby="profil-title">
        <div className="wrap sf-grid">
          <figure className="sf-pic">
            <img src="/assets/img/site/hero-pesan.webp" alt="Petugas Jennete Rent menyerahkan kunci kendaraan kepada klien" loading="lazy" />
            <figcaption className="svc-stat">
              <strong>Sejak 2010</strong>
              <span>{COMPANY}</span>
            </figcaption>
          </figure>
          <div className="sf-body">
            <h2 id="profil-title">Profil singkat</h2>
            <p className="lead">
              Java Enterprise Transportation &amp; Rent Car Services (Jennete Rent) adalah penyedia layanan sewa mobil dan motor yang sudah belasan tahun beroperasi di
              Jakarta. Menggunakan armada mobil keluaran baru, dengan kondisi terawat untuk disewakan kepada Anda.
            </p>
            <p className="ab-more">
              Pilihan mobil yang kami sediakan sangat variatif dan harga yang sangat kompetitif di Jakarta. Kami menawarkan untuk Anda seperti: Toyota Alphard, Vellfire,
              Camry, rental Toyota Innova, rental Daihatsu Xenia, Avanza, Suzuki APV, Nissan Grand Livina, Toyota Hiace, serta mobil listrik seperti Hyundai Kona.
            </p>
            <p className="ab-more">
              Anda dapat menyewa mobil/motor untuk harian maupun bulanan dengan sopir ataupun tanpa sopir. Kami mengutamakan kebersihan dari setiap armada untuk
              kenyamanan para customer. Jennete Rent berkomitmen untuk menjadi mitra sewa kendaraan terpercaya bagi Anda.
            </p>
            <ul className="ab-sols">
              {SOLS.map(([slug, icon, b, s]) => (
                <li key={slug}>
                  <Link href={`/solusi-bisnis/${slug}/`}>
                    <span className="hl-ic" aria-hidden="true">
                      <Ic name={icon} />
                    </span>
                    <b>{b}</b>
                    <small>{s}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="sec-soft" id="visi-misi" aria-label="Visi dan misi">
        <div className="wrap vm-grid">
          <div className="vm-visi">
            <span className="vm-ic" aria-hidden="true">
              <Ic name="eye" />
            </span>
            <h2>Visi</h2>
            <blockquote>
              <p>{VISI}</p>
            </blockquote>
          </div>
          <div className="vm-misi">
            <span className="vm-ic" aria-hidden="true">
              <Ic name="flag" />
            </span>
            <h2>Misi</h2>
            <ol>
              {MISI.map((m) => (
                <li key={m}>
                  <p>{m}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="dt-spec-sec ab-legal-sec" id="legalitas" aria-labelledby="legal-title">
        <div className="wrap">
          <div className="dt-spec-grid">
            <div>
              <h2 id="legal-title">Legalitas</h2>
              <p className="lead">Informasi badan usaha untuk kebutuhan verifikasi vendor dan pengadaan.</p>
            </div>
            <dl className="spec-list">
              {LEGAL.map(([dt, dd]) => (
                <div key={dt}>
                  <dt>{dt}</dt>
                  <dd>{dd}</dd>
                </div>
              ))}
            </dl>
            <a className="btn btn-white" href={`mailto:${EMAIL}?subject=Permintaan%20dokumen%20legalitas%20Jennete%20Rent`}>
              Minta dokumen legalitas
              <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="sec-soft" aria-labelledby="pegang-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="pegang-title">Yang kami pegang</h2>
              <p className="lead">Cara kami bekerja di setiap kontrak, untuk perusahaan maupun instansi.</p>
            </div>
          </div>
          <ul className="inc-list">
            <li className="rv">
              <span className="trust-ic" aria-hidden="true">
                <Ic name="wrench" />
              </span>
              <h3>Unit tetap jalan</h3>
              <p>Servis berkala tiap 10.000 km atau 6 bulan dan bengkel resmi ATPM di seluruh Indonesia.</p>
            </li>
            <li className="rv">
              <span className="trust-ic" aria-hidden="true">
                <Ic name="doc" />
              </span>
              <h3>Penawaran tertulis</h3>
              <p>Penawaran resmi yang bisa langsung diproses di internal perusahaan Anda.</p>
            </li>
            <li className="rv">
              <span className="trust-ic" aria-hidden="true">
                <Ic name="phone" />
              </span>
              <h3>Siaga 24/7</h3>
              <p>
                Bantuan darurat di jalan melalui <a href={`tel:${EMERGENCY.tel}`}>{EMERGENCY.label}</a>, tim kami datang ke lokasi.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <div id="klien"></div>
      <Proof />
      <section id="kontak" aria-labelledby="kontak-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="kontak-title">Kantor dan kontak</h2>
              <p className="lead">Kunjungi kantor kami atau hubungi tim melalui kanal berikut.</p>
            </div>
          </div>
          <div className="ab-office">
            <ul className="ab-contact">
              <li>
                <span className="hl-ic" aria-hidden="true">
                  <Ic name="pin" />
                </span>
                <div>
                  <b>Alamat</b>
                  <span>{ADDRESS}</span>
                </div>
              </li>
              <li>
                <span className="hl-ic" aria-hidden="true">
                  <Ic name="phone" />
                </span>
                <div>
                  <b>Telepon</b>
                  <a href={`tel:${PHONE_1.tel}`}>{PHONE_1.label}</a> · <a href={`tel:${PHONE_2.tel}`}>{PHONE_2.label}</a>
                </div>
              </li>
              <li>
                <span className="hl-ic" aria-hidden="true">
                  <Ic name="mail" />
                </span>
                <div>
                  <b>Email</b>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </li>
              <li>
                <span className="hl-ic" aria-hidden="true">
                  <Ic name="clock" />
                </span>
                <div>
                  <b>Jam kantor</b>
                  <span>{HOURS}</span>
                </div>
              </li>
            </ul>
            <div className="ab-map">
              <span className="trust-ic" aria-hidden="true">
                <Ic name="pin" />
              </span>
              <h3>{ADDRESS}</h3>
              <p>
                Bantuan darurat di jalan tetap siaga 24 jam di <a href={`tel:${EMERGENCY.tel}`}>{EMERGENCY.label}</a>.
              </p>
              <a className="btn btn-white" href={MAPS} target="_blank" rel="noopener">
                Buka di Google Maps
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
      <CtaBand
        title="Siap bekerja sama dengan Jennete Rent?"
        text="Ceritakan kebutuhan kendaraan perusahaan Anda. Tim kami menyiapkan penawaran resmi."
        secondary={
          <Link className="btn btn-ghost-w" href="/pesan/">
            Pesan kendaraan
          </Link>
        }
      />
    </>
  );
}
