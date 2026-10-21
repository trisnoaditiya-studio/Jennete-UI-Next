import type { ChipOpt, ListingConfig } from "@/components/armada/FleetListing";
import type { StripPromo } from "@/components/armada/ArmadaSections";
import { listrik, mobil, motor, premium, UNITS, type Unit } from "./fleet";
import { rp } from "./site";

/* Konfigurasi 5 halaman listing armada */
export type ArmadaPage = {
  key: string; // kunci FAQ & path
  meta: { title: string; description: string };
  hero: { crumbs: [string, string?][]; title: string; sub: string; img: string; pos: string; facts: [string, string, string][] };
  strip?: { tiles: [string, string, string][]; promo: StripPromo };
  units: Unit[];
  listing: ListingConfig;
  collectionsSkip?: string;
  inc: boolean;
  faqTitle: string;
  cta: [string, string];
};

const L = "/armada/mobil/listrik/";
const M = "/armada/mobil/";
const P = "/armada/mobil/premium/";
const KAT_BASE = ["MPV", "SUV", "City Car", "Sedan"];
const katMobil: ChipOpt[] = [...KAT_BASE, ["Premium", P]];
const bbMobil: ChipOpt[] = [["Listrik", L], ["PHEV", L], "Bensin"];
const NOTE_M = "Harga harian sebagai acuan. Harga kontrak bulanan dan tahunan dihitung sesuai jumlah unit dan durasi.";
const NOTE_ALL = "Harga mobil per hari dan motor per minggu sebagai acuan. Harga kontrak bulanan dan tahunan dihitung sesuai jumlah unit dan durasi.";
const BERANDA: [string, string] = ["Beranda", "/"];
const ARMADA: [string, string] = ["Armada", "/armada/"];
const min = (l: Unit[]) => Math.min(...l.filter((u) => u.price).map((u) => u.price!));

export const ARMADA_PAGES: Record<string, ArmadaPage> = {
  armada: {
    key: "armada",
    meta: {
      title: "Armada Sewa Mobil & Motor untuk Perusahaan | Jennete Rent",
      description: "Katalog armada Jennete Rent: MPV, SUV, city car, mobil listrik, mobil premium, dan motor. Harga mulai, servis dan bantuan darurat 24/7 termasuk.",
    },
    hero: {
      crumbs: [BERANDA, ["Armada"]],
      title: "Armada untuk kebutuhan perusahaan",
      sub: "Pilih unit sesuai kebutuhan operasional. Setiap unit sudah termasuk servis berkala, bengkel resmi ATPM, dan bantuan darurat 24/7.",
      img: "hero-armada.webp",
      pos: "62% center",
      facts: [
        ["car", `${mobil.length} mobil`, "MPV, SUV, city car, sedan"],
        ["moto", `${motor.length} motor`, "matic dan bebek"],
        ["bolt", `${listrik.length} unit`, "listrik & PHEV"],
      ],
    },
    units: UNITS,
    listing: { seg: "all", note: NOTE_ALL, kats: [...KAT_BASE, "Matic", "Bebek", ["Premium", P]], bbs: bbMobil },
    collectionsSkip: "",
    inc: true,
    faqTitle: "Pertanyaan seputar armada",
    cta: ["Butuh beberapa unit sekaligus?", "Ceritakan jumlah unit, durasi, dan kebutuhan sopir. Tim kami menyiapkan penawaran resmi."],
  },
  "armada/mobil": {
    key: "armada/mobil",
    meta: {
      title: "Sewa Mobil untuk Perusahaan: MPV, SUV, City Car | Jennete Rent",
      description: "Sewa mobil untuk perusahaan di Jakarta: MPV, SUV, city car, sedan, mobil listrik, dan unit premium. Kontrak harian hingga tahunan.",
    },
    hero: {
      crumbs: [BERANDA, ARMADA, ["Mobil"]],
      title: "Sewa mobil untuk perusahaan",
      sub: "Mobil dinas dan operasional, dari city car hingga MPV premium. Bisa dengan atau tanpa sopir.",
      img: "hero-armada-mobil.webp",
      pos: "66% center",
      facts: [
        ["car", `${mobil.length} unit`, "mobil tersedia"],
        ["cal", "Bulanan–tahunan", "durasi kontrak"],
        ["person", "Sopir opsional", "berpengalaman"],
      ],
    },
    units: mobil,
    listing: { seg: "mobil", note: NOTE_M, kats: katMobil, bbs: bbMobil },
    collectionsSkip: "/armada/motor/",
    inc: true,
    faqTitle: "Pertanyaan seputar sewa mobil",
    cta: ["Butuh mobil untuk tim Anda?", "Ceritakan jumlah unit, durasi, dan kebutuhan sopir. Tim kami menyiapkan penawaran resmi."],
  },
  "armada/motor": {
    key: "armada/motor",
    meta: {
      title: "Sewa Motor Mingguan & Bulanan | Jennete Rent",
      description: "Sewa motor matic dan bebek di Jakarta, durasi mingguan dan bulanan: Yamaha Aerox, Fino, X-Ride, Jupiter, Vega Force, dan Suzuki NEX II.",
    },
    hero: {
      crumbs: [BERANDA, ARMADA, ["Motor"]],
      title: "Sewa motor mingguan dan bulanan",
      sub: "Matic dan bebek untuk mobilitas harian. Harga per minggu sebagai acuan.",
      img: "hero-armada-motor.webp",
      pos: "60% center",
      facts: [
        ["moto", `${motor.length} unit`, "motor tersedia"],
        ["cal", "Mingguan–bulanan", "durasi sewa"],
        ["tag", `Mulai ${rp(min(motor))}`, "per minggu"],
      ],
    },
    units: motor,
    listing: { seg: "motor", showBb: false, note: "Harga per minggu sebagai acuan. Sewa motor tersedia untuk durasi mingguan dan bulanan." },
    collectionsSkip: "/armada/motor/",
    inc: false,
    faqTitle: "Pertanyaan seputar sewa motor",
    cta: ["Butuh beberapa motor untuk tim lapangan?", "Ceritakan jumlah unit dan durasi. Tim kami menyiapkan penawaran resmi."],
  },
  "armada/mobil/listrik": {
    key: "armada/mobil/listrik",
    meta: {
      title: "Sewa Mobil Listrik untuk Perusahaan | Jennete Rent",
      description: "Sewa mobil listrik dan PHEV untuk perusahaan: Wuling, BYD, Chery, Jaecoo. Servis di bengkel resmi ATPM dan bantuan darurat 24/7 termasuk.",
    },
    hero: {
      crumbs: [BERANDA, ARMADA, ["Mobil", M], ["Mobil listrik"]],
      title: "Sewa mobil listrik untuk perusahaan",
      sub: "Unit listrik dan PHEV untuk mobil dinas dan operasional, dengan layanan purna sewa yang sama seperti unit lainnya.",
      img: "hero-armada-listrik.webp",
      pos: "72% center",
      facts: [
        ["bolt", `${listrik.filter((u) => u.bb === "Listrik").length} unit`, "mobil listrik"],
        ["car", `${listrik.filter((u) => u.bb === "PHEV").length} unit`, "PHEV (plug-in hybrid)"],
        ["tag", `Mulai ${rp(min(listrik))}`, "per hari"],
      ],
    },
    strip: {
      tiles: [
        ["bolt", "Listrik dan PHEV", "MPV, SUV, dan city car"],
        ["wrench", "Perawatan termasuk", "Bengkel resmi ATPM"],
        ["phone", "Darurat 24/7", "Tim datang ke lokasi"],
        ["doc", "Penawaran resmi", "Harga sesuai unit dan durasi"],
      ],
      promo: {
        img: "site/blogImg1.jpg",
        title: "Memilih city car listrik?",
        text: "Panduan singkat memilih mobil listrik kecil untuk operasional dalam kota.",
        href: "/artikel/mobil-listrik-kecil-untuk-perkotaan/",
        label: "Baca artikel",
      },
    },
    units: listrik,
    listing: {
      seg: "mobil",
      note: NOTE_M,
      kats: katMobil,
      bbs: ["Listrik", "PHEV", ["Bensin", M]],
      alt: [M, "di semua mobil"],
      ph: "informasi pengisian daya (charger, akses SPKLU) belum tersedia di situs.",
    },
    collectionsSkip: "/armada/mobil/listrik/",
    inc: true,
    faqTitle: "Pertanyaan seputar mobil listrik",
    cta: ["Mau mencoba armada listrik?", "Ceritakan jumlah unit dan durasi. Tim kami menyiapkan penawaran resmi."],
  },
  "armada/mobil/premium": {
    key: "armada/mobil/premium",
    meta: {
      title: "Sewa Mobil Premium untuk Direksi & Tamu VIP | Jennete Rent",
      description: "Sewa mobil premium: Toyota Alphard, Voxy, Camry, Honda Odyssey, Accord, Hyundai Palisade. Bisa dengan sopir berpengalaman.",
    },
    hero: {
      crumbs: [BERANDA, ARMADA, ["Mobil", M], ["Mobil premium"]],
      title: "Mobil premium untuk direksi dan tamu VIP",
      sub: "MPV, sedan, dan SUV premium untuk jajaran manajemen dan kunjungan tamu. Harga sesuai penawaran.",
      img: "hero-armada-premium.webp",
      pos: "70% center",
      facts: [
        ["car", `${premium.length} unit`, "MPV, sedan, SUV"],
        ["person", "Dengan sopir", "opsional"],
        ["tag", "Sesuai penawaran", "harga"],
      ],
    },
    strip: {
      tiles: [
        ["person", "Direksi", "Mobil dinas jajaran manajemen"],
        ["building", "Tamu VIP", "Kunjungan klien dan tamu"],
        ["wrench", "Perawatan termasuk", "Servis dan darurat 24/7"],
        ["doc", "Sesuai penawaran", "Harga sesuai unit dan durasi"],
      ],
      promo: {
        img: "site/heroImg1.jpg",
        title: "Butuh sopir untuk direksi?",
        text: "Padukan unit premium dengan layanan kendaraan operasional dan sopir berpengalaman.",
        href: "/solusi-bisnis/operasional-sopir/",
        label: "Lihat layanan sopir",
      },
    },
    units: premium,
    listing: {
      seg: "mobil",
      note: "Harga unit premium dihitung sesuai unit, durasi, dan kebutuhan sopir.",
      kats: [...KAT_BASE, "Premium"],
      katAll: M,
      katDefault: "Premium",
      bbs: bbMobil,
      alt: [M, "di semua mobil"],
      ph: "foto Toyota Camry, Honda Accord, dan Hyundai Palisade.",
    },
    collectionsSkip: "/armada/mobil/premium/",
    inc: true,
    faqTitle: "Pertanyaan seputar mobil premium",
    cta: ["Menyiapkan mobil untuk direksi atau tamu VIP?", "Ceritakan unit, jadwal, dan kebutuhan sopir. Tim kami menyiapkan penawaran resmi."],
  },
};
