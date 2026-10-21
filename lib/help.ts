import { FAQ } from "./faqs";

/* Kelompok FAQ di /bantuan/ (kunci dari lib/faqs.tsx) */
export const HELP_GROUPS: { key: string; title: string; items: string[] }[] = [
  { key: "harga", title: "Harga dan kontrak", items: ["harga-sewa-kendaraan", "lama-durasi-kontrak", "harga-unit-premium", "motor-disewa-harian"] },
  { key: "layanan", title: "Layanan dan perawatan", items: ["termasuk-layanan-sewa", "jadwal-servis-unit", "unit-bermasalah-luar", "dilakukan-mogok-kecelakaan"] },
  { key: "sopir", title: "Sopir", items: ["sewa-sopir", "layanan-sopir-digabung"] },
  { key: "pemesanan", title: "Pemesanan dan dokumen", items: ["cara-memesan", "dokumen-disiapkan-perusahaan", "dokumen-disiapkan-perorangan"] },
  { key: "instansi", title: "Instansi pemerintah", items: ["instansi-pemerintah-memesan", "durasi-sewa-instansi"] },
];
export const HELP_TOTAL = HELP_GROUPS.reduce((n, g) => n + g.items.length, 0);
export const helpFaq = (k: string) => FAQ[k];

export const DOC_COMPANY = ["SIUP dan NPWP perusahaan", "Akta pendirian dan SK Kemenkumham", "Tanda daftar perusahaan", "Surat keterangan domisili", "KTP direksi atau pejabat penanggung jawab", "Surat kuasa bila bukan direktur", "SIM pengemudi"];
export const DOC_PERSON = ["KTP", "Kartu Keluarga (KK)", "SIM", "NPWP", "Bukti tempat tinggal"];
