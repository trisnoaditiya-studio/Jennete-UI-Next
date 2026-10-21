import type { Metadata } from "next";
import Link from "next/link";
import { Ic } from "@/components/icons";
import BuyBox from "@/components/detail/BuyBox";
import UnitGallery, { type Photo } from "@/components/detail/UnitGallery";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IncList from "@/components/sections/IncList";
import Crumb from "@/components/ui/Crumb";
import FleetCard from "@/components/ui/FleetCard";
import QuoteButton from "@/components/ui/QuoteButton";
import { faqFor } from "@/lib/faqs";
import { UNITS } from "@/lib/fleet";

export const metadata: Metadata = {
  title: "Sewa Wuling Cortez Darion | Jennete Rent",
  description: "Sewa Wuling Cortez Darion, MPV listrik 7 kursi, mulai Rp1.500.000/hari atau kontrak perusahaan. Servis, bengkel resmi ATPM, dan bantuan darurat 24/7 termasuk.",
};

const PHOTOS: Photo[] = (
  [
    ["dtHero", "Tampak depan samping"],
    ["dtG2", "Detail depan dan lampu"],
    ["dtI1", "Dasbor dan kokpit"],
    ["dtI2", "Kursi baris kedua"],
    ["dtI3", "Kabin tiga baris"],
    ["dtI4", "Atap kaca (sunroof)"],
  ] as const
).map(([f, c]) => [`/assets/img/site/${f}.jpg`, c]);

const FIT = [
  ["person", "Penjemputan tamu dan direksi", "Kabin lega untuk 7 penumpang"],
  ["people", "Perjalanan dinas rombongan", "Satu unit untuk satu tim kecil"],
  ["leaf", "Armada operasional listrik", "Pilihan kendaraan tanpa emisi gas buang"],
];

const SPECS = [
  ["Merek", "Wuling"],
  ["Model", "Cortez Darion"],
  ["Tipe bodi", "MPV"],
  ["Kapasitas", "7 penumpang"],
  ["Penggerak", "Listrik"],
  ["Kapasitas baterai", "72,5 kWh"],
  ["Transmisi", "Otomatis"],
];

export default function WulingCortezDarion() {
  return (
    <>
      <section className="dt-hero" aria-labelledby="dt-title">
        <div className="wrap">
          <Crumb dark items={[["Beranda", "/"], ["Armada", "/armada/"], ["MPV", "/armada/mobil/?kategori=MPV"], ["Wuling Cortez Darion"]]} />
          <div className="dt-grid">
            <UnitGallery name="Wuling Cortez Darion" photos={PHOTOS} />
            <aside className="buy" aria-label="Ringkasan sewa">
              <div className="dt-tags">
                <span className="tag">Listrik</span>
                <span className="tag">MPV</span>
                <span className="tag">7 kursi</span>
              </div>
              <h1 id="dt-title">Wuling Cortez Darion</h1>
              <p className="dt-lead">MPV listrik 7 kursi untuk tamu perusahaan, perjalanan dinas, dan operasional harian.</p>
              <BuyBox brand="Wuling" model="Cortez Darion" price="Rp1.500.000" />
              <ul className="buy-specs" aria-label="Spesifikasi utama">
                <li>
                  <b className="num">7</b>
                  <small>Kursi</small>
                </li>
                <li>
                  <b>Listrik</b>
                  <small>Penggerak</small>
                </li>
                <li>
                  <b className="num">72,5 kWh</b>
                  <small>Baterai</small>
                </li>
                <li>
                  <b>Otomatis</b>
                  <small>Transmisi</small>
                </li>
              </ul>
              <ul className="buy-inc">
                <li>Servis berkala sudah termasuk</li>
                <li>Bengkel resmi ATPM di seluruh Indonesia</li>
                <li>Bantuan darurat 24/7</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
      <section aria-labelledby="fit-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="fit-title">Cocok untuk</h2>
            </div>
          </div>
          <ul className="needs">
            {FIT.map(([icon, b, s]) => (
              <li className="rv" key={b}>
                <span className="hl-ic" aria-hidden="true">
                  <Ic name={icon} sw={1.7} />
                </span>
                <b>{b}</b>
                <small>{s}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="dt-spec-sec" aria-labelledby="spec-title">
        <div className="wrap">
          <div className="dt-spec-grid">
            <div>
              <h2 id="spec-title">Spesifikasi</h2>
              <p className="lead">Spesifikasi dapat berbeda per unit dan tahun produksi. Konfirmasi ke tim kami sebelum memesan.</p>
            </div>
            <dl className="spec-list">
              {SPECS.map(([dt, dd]) => (
                <div key={dt}>
                  <dt>{dt}</dt>
                  <dd>{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <IncList className="dt-inc" title="Sudah termasuk dalam sewa" link={false} />
      <section className="dt-similar" aria-labelledby="sim-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="sim-title">Unit serupa</h2>
              <p className="lead">MPV lain yang bisa jadi pertimbangan.</p>
            </div>
            <Link className="btn btn-outline" href="/armada/mobil/">
              Lihat semua mobil
            </Link>
          </div>
          <div className="sim-grid">
            {["alphard", "voxy", "odyssey", "tiggo8"].map((id) => {
              const u = UNITS.find((x) => x.id === id)!;
              return <FleetCard u={u} tags={u.premium ? [u.kategori] : [u.bb, u.kategori]} href="/armada/mobil/" key={id} />;
            })}
          </div>
        </div>
      </section>
      <FaqSection title="Pertanyaan tentang unit ini" lead="Belum menemukan jawabannya? Tanyakan langsung ke tim kami." items={faqFor("wuling-cortez-darion")} />
      <CtaBand
        title="Butuh beberapa unit Cortez Darion?"
        text="Ceritakan jumlah unit, durasi, dan kebutuhan sopir. Tim kami menyiapkan penawaran resmi."
        primary={<QuoteButton className="btn btn-white" brand="Wuling" model="Cortez Darion" />}
      />
    </>
  );
}
