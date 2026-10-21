import type { Metadata } from "next";
import Link from "next/link";
import { Ic } from "@/components/icons";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import HowSteps from "@/components/sections/HowSteps";
import Proof from "@/components/sections/Proof";
import Trust from "@/components/sections/Trust";
import Crumb from "@/components/ui/Crumb";
import QuoteButton from "@/components/ui/QuoteButton";
import { faqFor } from "@/lib/faqs";
import { EMERGENCY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solusi Bisnis | Jennete Rent",
  description: "Sewa jangka panjang, kendaraan operasional dengan sopir, pengadaan instansi melalui e-Katalog LKPP, dan layanan purna sewa dari Jennete Rent.",
};

const ROWS = [
  {
    id: "s-jangka",
    slug: "sewa-jangka-panjang",
    img: "blogImg2",
    alt: "Deretan armada Jennete Rent di depan gedung perkantoran",
    chip: "Perusahaan",
    title: "Sewa jangka panjang",
    text: "Kontrak bulanan hingga tahunan untuk mobil dinas dan operasional, tanpa perlu membeli dan merawat unit sendiri.",
    ticks: ["Durasi kontrak bulanan hingga tahunan, sesuai kebutuhan perusahaan", "Pilihan unit dari city car hingga MPV premium", "Servis berkala dan bantuan darurat sudah termasuk"],
  },
  {
    id: "s-sopir",
    slug: "operasional-sopir",
    img: "heroImg1",
    alt: "MPV eksekutif di jalan protokol Jakarta",
    chip: "Perusahaan",
    title: "Kendaraan operasional + sopir",
    text: "Unit beserta sopir berpengalaman yang menguasai rute Jakarta dan sekitarnya, untuk kebutuhan harian kantor.",
    ticks: ["Antar-jemput direksi, tamu, atau karyawan", "Sopir berpengalaman disediakan oleh Jennete Rent", "Bisa digabung dengan kontrak sewa jangka panjang"],
  },
  {
    id: "s-instansi",
    slug: "pengadaan-instansi",
    img: "blogImg3",
    alt: "SUV di kawasan perkantoran",
    chip: "Instansi pemerintah",
    title: "Pengadaan instansi",
    text: "Jennete Rent terdaftar sebagai penyedia di e-Katalog LKPP, sehingga pengadaan kendaraan dapat dilakukan melalui jalur resmi.",
    ticks: ["Pengadaan melalui e-Katalog LKPP", "Pilihan unit untuk kendaraan dinas dan operasional", "Layanan purna sewa yang sama dengan klien korporat"],
  },
];

const YES = <span className="yes">Termasuk</span>;
const CMP: [string, React.ReactNode, React.ReactNode, React.ReactNode][] = [
  ["Cocok untuk", "Mobil dinas dan operasional perusahaan", "Antar-jemput direksi, tamu, karyawan", "Kementerian, lembaga, dan pemda"],
  ["Durasi", "Bulanan hingga tahunan", "Sesuai kebutuhan", "Mengikuti paket pengadaan"],
  ["Sopir", "Opsional", YES, "Opsional"],
  ["Cara memesan", "Penawaran resmi", "Penawaran resmi", "e-Katalog LKPP"],
  ["Servis berkala", YES, YES, YES],
  ["Bengkel resmi ATPM", YES, YES, YES],
  ["Bantuan darurat 24/7", YES, YES, YES],
];

const NEEDS = [
  ["person", "Mobil dinas direksi", "Unit premium untuk jajaran manajemen"],
  ["people", "Antar-jemput karyawan", "MPV dengan sopir berpengalaman"],
  ["building", "Kunjungan klien dan tamu", "Kesan profesional sejak penjemputan"],
  ["pin", "Operasional lapangan", "SUV untuk mobilitas tim di dalam dan luar kota"],
  ["project", "Kendaraan proyek", "Unit selama masa proyek berjalan"],
  ["shield", "Armada instansi", "Pengadaan melalui e-Katalog LKPP"],
];

export default function SolusiBisnis() {
  return (
    <>
      <section className="sb-hero" aria-labelledby="sb-title">
        <div className="sb-media">
          <img src="/assets/img/site/sbHero.jpg" alt="" fetchPriority="high" />
        </div>
        <div className="sb-scrim" aria-hidden="true"></div>
        <div className="wrap sb-hero-in">
          <Crumb items={[["Beranda", "/"], ["Solusi Bisnis"]]} />
          <h1 id="sb-title">Satu mitra untuk seluruh kebutuhan kendaraan perusahaan</h1>
          <p className="sub">
            Dari mobil dinas, kendaraan operasional dengan sopir, hingga pengadaan instansi pemerintah. Perawatan unit kami yang urus di setiap kontrak.
          </p>
          <div className="hero-cta">
            <QuoteButton />
            <a className="btn btn-ghost-w" href="#solusi">
              Lihat solusi
            </a>
          </div>
          <ul className="jump" aria-label="Lompat ke solusi">
            {[...ROWS.map((r) => [r.id, r.title === "Kendaraan operasional + sopir" ? "Operasional + sopir" : r.title]), ["s-purna", "Layanan purna sewa"]].map(([id, t]) => (
              <li key={id}>
                <a href={`#${id}`}>{t}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Trust />
      <section id="solusi" aria-labelledby="sol-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="sol-title">Pilih solusi sesuai kebutuhan</h2>
              <p className="lead">Tiga cara menyewa untuk organisasi, dengan layanan purna sewa yang sama di semuanya.</p>
            </div>
          </div>
          {ROWS.map((r, i) => (
            <article className={`srow${i % 2 ? " rev" : ""} rv`} id={r.id} key={r.id}>
              <div className="srow-pic">
                <img src={`/assets/img/site/${r.img}.jpg`} alt={r.alt} loading="lazy" />
              </div>
              <div className="srow-body">
                <span className="chip-who">{r.chip}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <ul className="ticks">
                  {r.ticks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="srow-cta">
                  <QuoteButton />
                  <Link className="btn btn-outline" href={`/solusi-bisnis/${r.slug}/`}>
                    Pelajari detail
                  </Link>
                </div>
              </div>
            </article>
          ))}
          <article className="srow rev rv" id="s-purna">
            <div className="srow-pic">
              <img src="/assets/img/site/svcImg1.jpg" alt="Teknisi memeriksa unit di bengkel" loading="lazy" />
            </div>
            <div className="srow-body">
              <span className="chip-who inc">Termasuk di setiap kontrak</span>
              <h3>Layanan purna sewa</h3>
              <p>Unit tetap jalan, perawatannya kami yang urus. Tim Anda bisa fokus bekerja.</p>
              <ul className="ticks">
                <li>Servis tiap 10.000 km atau 6 bulan, mana yang lebih dulu</li>
                <li>Bengkel resmi ATPM di seluruh Indonesia</li>
                <li>
                  Bantuan darurat 24/7 di <a href={`tel:${EMERGENCY.tel}`}>{EMERGENCY.label}</a>
                </li>
              </ul>
              <div className="srow-cta">
                <Link className="btn btn-outline" href="/solusi-bisnis/layanan-purna-sewa/">
                  Pelajari detail
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="cmp-sec" id="banding" aria-labelledby="cmp-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="cmp-title">Bandingkan sekilas</h2>
              <p className="lead">Masih ragu memilih? Ringkasan ini membantu menentukan titik awal. Ketentuan detail mengikuti penawaran resmi.</p>
            </div>
          </div>
          <div className="cmp-scroll" tabIndex={0} role="region" aria-label="Tabel perbandingan solusi">
            <table className="cmp">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Aspek</span>
                  </th>
                  <th scope="col">Sewa jangka panjang</th>
                  <th scope="col">Operasional + sopir</th>
                  <th scope="col">Pengadaan instansi</th>
                </tr>
              </thead>
              <tbody>
                {CMP.map(([a, ...cols]) => (
                  <tr key={a}>
                    <th scope="row">{a}</th>
                    {cols.map((c, k) => (
                      <td key={k}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="kebutuhan" aria-labelledby="need-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="need-title">Dipakai untuk berbagai kebutuhan</h2>
              <p className="lead">Beberapa kebutuhan yang paling sering kami bantu. Tidak menemukan kebutuhan Anda? Ceritakan saja ke tim kami.</p>
            </div>
          </div>
          <ul className="needs">
            {NEEDS.map(([icon, b, s]) => (
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
      <Proof />
      <HowSteps />
      <FaqSection title="Pertanyaan seputar sewa korporat" items={faqFor("solusi-bisnis")} />
      <CtaBand title="Siap menyusun armada perusahaan Anda?" text="Ceritakan jumlah unit, durasi, dan kebutuhan sopir. Tim kami menyiapkan penawaran resmi." />
    </>
  );
}
