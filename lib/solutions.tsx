import Link from "next/link";
import type { ReactNode } from "react";
import { Ic } from "@/components/icons";
import { EMERGENCY } from "./site";

/* Empat halaman Solusi Bisnis (/solusi-bisnis/[slug]/) */
export type Solution = {
  slug: string;
  name: string; // label menu & breadcrumb
  card: [string, string]; // [ringkasan kartu "Solusi lainnya", gambar]
  meta: { title: string; description: string };
  hero: { img: string; pos: string; chip: string; title: string; sub: string; cta2: ReactNode; facts: [string, string][] };
  feature?: {
    img: string;
    alt: string;
    pos?: string;
    stat: [string, string];
    title: string;
    lead: string;
    bens: [string, string, ReactNode][];
    more: ReactNode;
    uses: { title: string; lead: string; items: [string, string, string][] };
  };
  fleet?: { ids: string[]; title: string; lead: string };
  sections: ("inc" | "how" | "proof" | "svc" | "sos")[];
  faqTitle: string;
  cta: [string, string];
};

const PH = (t: string) => <p className="ph-note">Perlu dilengkapi: {t}</p>;

export const SOLUTIONS: Solution[] = [
  {
    slug: "sewa-jangka-panjang",
    name: "Sewa jangka panjang",
    card: ["Kontrak bulanan hingga tahunan untuk mobil dinas dan operasional.", "blogImg2"],
    meta: {
      title: "Sewa Mobil Jangka Panjang untuk Perusahaan | Jennete Rent",
      description: "Sewa mobil jangka panjang untuk perusahaan di Jakarta. Kontrak bulanan hingga tahunan, servis berkala dan bantuan darurat 24/7 sudah termasuk.",
    },
    hero: {
      img: "heroImg2",
      pos: "70% center",
      chip: "Untuk perusahaan",
      title: "Sewa mobil jangka panjang untuk perusahaan",
      sub: "Kontrak bulanan hingga tahunan untuk mobil dinas dan operasional, tanpa perlu membeli dan merawat unit sendiri.",
      cta2: (
        <a className="btn btn-ghost-w" href="#armada">
          Lihat armada
        </a>
      ),
      facts: [
        ["Bulanan–tahunan", "durasi kontrak"],
        ["City car–MPV premium", "pilihan unit"],
        ["Termasuk", "servis & bantuan darurat"],
      ],
    },
    feature: {
      img: "site/blogImg2.jpg",
      alt: "Deretan armada Jennete Rent di depan gedung perkantoran",
      stat: ["Bulanan–tahunan", "tanpa batas durasi sewa"],
      title: "Mobil dinas tanpa repot kepemilikan",
      lead: "Perusahaan cukup memilih unit dan durasi. Perawatan, servis, dan bantuan di jalan kami yang urus selama kontrak berjalan.",
      bens: [
        ["cal", "Durasi fleksibel", "Bulanan hingga tahunan, tanpa batas durasi sewa"],
        ["wrench", "Perawatan sudah termasuk", "Servis berkala dan bantuan darurat 24/7"],
        ["doc", "Penawaran tertulis", "Bisa langsung Anda proses di internal perusahaan"],
      ],
      more: (
        <p className="sf-more">
          Pilihan unit dari city car hingga MPV premium, dan bisa digabung dengan layanan <Link href="/solusi-bisnis/operasional-sopir/">kendaraan + sopir</Link>.
        </p>
      ),
      uses: {
        title: "Cocok untuk",
        lead: "Kebutuhan yang paling sering memakai kontrak jangka panjang.",
        items: [
          ["site/heroImg1.jpg", "Mobil dinas direksi", "Unit premium untuk jajaran manajemen"],
          ["site/heroImg2.jpg", "Operasional lapangan", "SUV untuk mobilitas tim di dalam dan luar kota"],
          ["site/blogImg3.jpg", "Kendaraan proyek", "Unit selama masa proyek berjalan"],
        ],
      },
    },
    fleet: { ids: ["cortez", "tiggo8", "j5", "atto"], title: "Pilihan armada", lead: "Harga harian sebagai acuan. Harga kontrak bulanan dan tahunan dihitung sesuai jumlah unit dan durasi." },
    sections: ["inc", "how"],
    faqTitle: "Pertanyaan seputar sewa jangka panjang",
    cta: ["Siap menyusun armada perusahaan Anda?", "Ceritakan jumlah unit dan durasi kontrak. Tim kami menyiapkan penawaran resmi."],
  },
  {
    slug: "operasional-sopir",
    name: "Kendaraan operasional + sopir",
    card: ["Unit beserta sopir berpengalaman untuk kebutuhan harian kantor.", "heroImg1"],
    meta: {
      title: "Sewa Mobil dengan Sopir untuk Perusahaan | Jennete Rent",
      description: "Kendaraan operasional beserta sopir berpengalaman untuk antar-jemput direksi, tamu, dan karyawan di Jakarta dan sekitarnya.",
    },
    hero: {
      img: "heroImg1",
      pos: "center center",
      chip: "Untuk perusahaan",
      title: "Kendaraan operasional dengan sopir berpengalaman",
      sub: "Unit beserta sopir berpengalaman yang menguasai rute Jakarta dan sekitarnya, untuk kebutuhan harian kantor.",
      cta2: (
        <a className="btn btn-ghost-w" href="#armada">
          Lihat unit
        </a>
      ),
      facts: [
        ["Sopir disediakan", "oleh Jennete Rent"],
        ["Jakarta & sekitarnya", "rute harian"],
        ["Bisa digabung", "dengan kontrak jangka panjang"],
      ],
    },
    feature: {
      img: "site/hero-armada-premium.webp",
      alt: "Deretan mobil premium di depan lobi gedung",
      pos: "70% 80%",
      stat: ["Sopir disediakan", "oleh Jennete Rent"],
      title: "Tim Anda tinggal berangkat",
      lead: "Unit dan sopir disiapkan dalam satu kontrak, sehingga urusan pengemudi tidak lagi membebani tim General Affairs.",
      bens: [
        ["person", "Sopir berpengalaman", "Menguasai rute Jakarta dan sekitarnya"],
        ["car", "Antar-jemput", "Direksi, tamu, atau karyawan"],
        [
          "cal",
          "Bisa digabung",
          <>
            Dengan kontrak <Link href="/solusi-bisnis/sewa-jangka-panjang/">sewa jangka panjang</Link>
          </>,
        ],
      ],
      more: PH("ketentuan sopir (jam kerja, lembur, BBM, tol, parkir) belum tersedia di situs."),
      uses: {
        title: "Dipakai untuk",
        lead: "Kebutuhan harian kantor yang paling sering kami bantu.",
        items: [
          ["site/heroImg1.jpg", "Mobil dinas direksi", "Unit premium untuk jajaran manajemen"],
          ["site/blogImg2.jpg", "Antar-jemput karyawan", "MPV dengan sopir berpengalaman"],
          ["site/sbHero.jpg", "Kunjungan klien dan tamu", "Kesan profesional sejak penjemputan"],
        ],
      },
    },
    fleet: { ids: ["alphard", "voxy", "odyssey", "cortez"], title: "Unit yang sering dipilih", lead: "MPV yang nyaman untuk direksi, tamu, dan rombongan karyawan." },
    sections: ["inc", "how"],
    faqTitle: "Pertanyaan seputar sewa dengan sopir",
    cta: ["Butuh unit dengan sopir untuk kantor Anda?", "Ceritakan jumlah unit, jadwal, dan rute. Tim kami menyiapkan penawaran resmi."],
  },
  {
    slug: "pengadaan-instansi",
    name: "Pengadaan instansi",
    card: ["Terdaftar sebagai penyedia di e-Katalog LKPP untuk pengadaan pemerintah.", "blogImg3"],
    meta: {
      title: "Pengadaan Kendaraan Instansi via e-Katalog LKPP | Jennete Rent",
      description: "Jennete Rent terdaftar sebagai penyedia di e-Katalog LKPP. Pengadaan kendaraan dinas dan operasional instansi pemerintah melalui jalur resmi.",
    },
    hero: {
      img: "svcImg2",
      pos: "center center",
      chip: "Instansi pemerintah",
      title: "Pengadaan kendaraan instansi melalui e-Katalog LKPP",
      sub: "Jennete Rent terdaftar sebagai penyedia di e-Katalog LKPP, sehingga pengadaan kendaraan dapat dilakukan melalui jalur resmi.",
      cta2: (
        <a className="btn btn-ghost-w" href="#faq">
          Pertanyaan umum
        </a>
      ),
      facts: [
        ["e-Katalog LKPP", "penyedia terdaftar"],
        ["Dinas & operasional", "pilihan unit"],
        ["Purna sewa", "sama dengan klien korporat"],
      ],
    },
    feature: {
      img: "site/blogImg3.jpg",
      alt: "SUV di kawasan perkantoran",
      stat: ["e-Katalog LKPP", "penyedia terdaftar"],
      title: "Jalur pengadaan yang resmi",
      lead: "Kementerian, lembaga, dan pemerintah daerah dapat memesan kendaraan melalui e-Katalog LKPP, dengan layanan purna sewa yang sama seperti klien korporat.",
      bens: [
        ["shield", "Melalui e-Katalog LKPP", "Durasi mengikuti paket pengadaan"],
        ["car", "Dinas dan operasional", "Pilihan SUV, MPV, hingga city car"],
        ["wrench", "Purna sewa yang sama", "Seperti klien korporat"],
      ],
      more: (
        <div className="sol-callout">
          <span className="trust-ic" aria-hidden="true">
            <Ic name="shield" />
          </span>
          <div>
            <h3>Informasi produk e-Katalog</h3>
            <p>Hubungi tim kami untuk informasi produk dan etalase Jennete Rent di e-Katalog.</p>
          </div>
        </div>
      ),
      uses: {
        title: "Dipakai untuk",
        lead: "Kebutuhan kendaraan instansi yang paling sering kami bantu.",
        items: [
          ["site/hero-armada.webp", "Armada instansi", "Pengadaan melalui e-Katalog LKPP"],
          ["site/heroImg2.jpg", "Operasional lapangan", "SUV untuk mobilitas tim di dalam dan luar kota"],
          ["site/heroImg1.jpg", "Kendaraan dinas pimpinan", "Unit premium untuk jajaran pimpinan"],
        ],
      },
    },
    fleet: { ids: ["jetour", "tiggo8", "sealion", "cortez"], title: "Pilihan unit", lead: "Harga harian sebagai acuan. Nilai pengadaan mengikuti paket dan penawaran resmi." },
    sections: ["inc", "proof"],
    faqTitle: "Pertanyaan seputar pengadaan instansi",
    cta: ["Merencanakan pengadaan kendaraan instansi?", "Tim kami membantu menyiapkan informasi produk dan penawaran resmi."],
  },
  {
    slug: "layanan-purna-sewa",
    name: "Layanan purna sewa",
    card: ["Servis berkala, jaringan bengkel resmi, dan bantuan darurat 24/7.", "svcImg1"],
    meta: {
      title: "Layanan Purna Sewa: Servis, Bengkel ATPM, Darurat 24/7 | Jennete Rent",
      description: "Servis berkala tiap 10.000 km atau 6 bulan, bengkel resmi ATPM di seluruh Indonesia, dan bantuan darurat 24/7. Termasuk di setiap kontrak Jennete Rent.",
    },
    hero: {
      img: "heroImg3",
      pos: "65% center",
      chip: "Termasuk di setiap kontrak",
      title: "Unit tetap jalan, perawatannya kami yang urus",
      sub: "Layanan purna sewa sudah termasuk dalam setiap kontrak, sehingga tim Anda bisa fokus bekerja.",
      cta2: (
        <a className="btn btn-ghost-w" href={`tel:${EMERGENCY.tel}`}>
          Darurat {EMERGENCY.label}
        </a>
      ),
      facts: [
        ["10.000 km / 6 bulan", "servis berkala"],
        ["Bengkel resmi ATPM", "di seluruh Indonesia"],
        ["24/7", "bantuan darurat"],
      ],
    },
    sections: ["svc", "sos", "proof"],
    faqTitle: "Pertanyaan seputar layanan purna sewa",
    cta: ["Ingin armada yang selalu siap jalan?", "Layanan purna sewa berlaku di semua solusi. Tim kami menyiapkan penawaran resmi."],
  },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
