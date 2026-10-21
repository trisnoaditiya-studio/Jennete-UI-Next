import Link from "next/link";
import type { Faq } from "@/components/sections/FaqSection";

/* Semua pertanyaan umum situs. Halaman memilih daftar kunci (FAQ_PAGES). */
export const FAQ: Record<string, Faq> = {
  "harga-sewa-kendaraan": ["Berapa harga sewa kendaraan?", "Harga dipengaruhi jenis unit, tahun kendaraan, jumlah unit, durasi sewa, dan layanan sopir. Harga harian tercantum di halaman tiap kendaraan. Untuk kontrak bulanan atau tahunan, kami kirim penawaran resmi."],
  "termasuk-layanan-sewa": ["Apa saja yang termasuk dalam layanan sewa?", "Servis berkala tiap 10.000 km atau 6 bulan, bantuan darurat 24 jam, dan akses ke bengkel resmi ATPM di seluruh Indonesia."],
  "sewa-lebih-dari": ["Apakah bisa sewa lebih dari satu tahun?", "Bisa. Tidak ada batas durasi sewa, baik untuk perusahaan maupun pribadi."],
  "motor-disewa-harian": ["Apakah motor bisa disewa harian?", "Sewa motor tersedia untuk durasi mingguan dan bulanan."],
  "sewa-sopir": ["Apakah bisa sewa dengan sopir?", "Bisa. Pilih \"Termasuk sopir\" saat meminta penawaran, dan tim kami menyiapkan sopir berpengalaman."],
  "dokumen-disiapkan-perusahaan": ["Dokumen apa yang perlu disiapkan perusahaan?", "SIUP dan NPWP perusahaan, akta pendirian dan SK Kemenkumham, tanda daftar perusahaan, surat keterangan domisili, KTP direksi atau pejabat penanggung jawab, surat kuasa bila bukan direktur, dan SIM pengemudi. Tim kami juga melakukan survei lokasi domisili."],
  "harga-unit-premium": ["Kenapa harga unit premium tidak dicantumkan?", "Harga unit premium dihitung sesuai unit, durasi, dan kebutuhan sopir. Tim kami mengirim penawaran resmi setelah Anda menceritakan kebutuhannya."],
  "lama-durasi-kontrak": ["Berapa lama durasi kontrak yang bisa dipilih?", "Kontrak bisa bulanan hingga tahunan. Tidak ada batas durasi sewa, baik untuk perusahaan maupun pribadi."],
  "jadwal-servis-unit": ["Kapan jadwal servis unit?", "Servis tiap 10.000 km atau 6 bulan, mana yang lebih dulu. Tim kami mengingatkan sebelum jadwalnya tiba."],
  "unit-bermasalah-luar": ["Bagaimana jika unit bermasalah di luar Jakarta?", "Bawa unit ke bengkel resmi merek terkait yang terdekat dari lokasi Anda. Jaringan bengkel resmi ATPM tersedia di seluruh Indonesia."],
  "dilakukan-mogok-kecelakaan": ["Apa yang harus dilakukan saat mogok atau kecelakaan?", <>Hubungi tim kami di <a href="tel:08881111508">0888-1111-508</a>, dan kami datang ke lokasi. Layanan darurat tersedia 24 jam.</>],
  "layanan-sopir-digabung": ["Apakah layanan sopir bisa digabung dengan kontrak jangka panjang?", "Bisa. Kendaraan operasional dengan sopir dapat digabung dengan kontrak sewa jangka panjang. Ceritakan kebutuhannya saat meminta penawaran."],
  "cara-memesan": ["Bagaimana cara memesan?", <>Isi formulir di halaman <Link href="/pesan/">Pesan kendaraan</Link>, pilih jalur perusahaan atau perorangan, lalu kirim. Anda juga bisa menghubungi tim kami lewat WhatsApp di 0888-1111-508.</>],
  "dokumen-disiapkan-perorangan": ["Dokumen apa yang perlu disiapkan perorangan?", "KTP, KK, SIM, NPWP, dan bukti tempat tinggal."],
  "instansi-pemerintah-memesan": ["Apakah instansi pemerintah bisa memesan lewat e-Katalog?", "Bisa. Jennete Rent terdaftar sebagai penyedia di e-Katalog LKPP."],
  "durasi-sewa-instansi": ["Berapa durasi sewa untuk instansi?", "Durasi mengikuti paket pengadaan. Ketentuan detail mengikuti penawaran resmi."],
  "unit-ini-disewa": ["Apakah unit ini bisa disewa dengan sopir?", "Bisa. Pilih \"Termasuk sopir\" saat meminta penawaran, atau sampaikan saat reservasi lewat WhatsApp."],
  "harga-sewa-bulanan": ["Berapa harga sewa bulanan atau tahunan?", "Harga kontrak dihitung berdasarkan jumlah unit, durasi, dan layanan sopir. Tim kami mengirim penawaran resmi setelah Anda mengisi form."],
  "termasuk-sewa": ["Apa saja yang termasuk dalam sewa?", "Servis berkala tiap 10.000 km atau 6 bulan, bantuan darurat 24 jam, dan akses ke bengkel resmi ATPM di seluruh Indonesia."],
  "dokumen-disiapkan": ["Dokumen apa yang perlu disiapkan?", "Untuk perusahaan: SIUP dan NPWP perusahaan, akta pendirian dan SK Kemenkumham, surat keterangan domisili, KTP penanggung jawab, dan SIM pengemudi. Untuk perorangan: KTP, KK, SIM, NPWP, dan bukti tempat tinggal."],
};

/* daftar FAQ per halaman (urutan sesuai versi HTML) */
const FAQ_PAGES: Record<string, string[]> = {
  "armada": ["harga-sewa-kendaraan", "termasuk-layanan-sewa", "sewa-lebih-dari", "motor-disewa-harian"],
  "armada/mobil": ["harga-sewa-kendaraan", "sewa-sopir", "sewa-lebih-dari", "dokumen-disiapkan-perusahaan"],
  "armada/mobil/listrik": ["harga-sewa-kendaraan", "termasuk-layanan-sewa", "sewa-lebih-dari", "sewa-sopir"],
  "armada/mobil/premium": ["harga-unit-premium", "sewa-sopir", "sewa-lebih-dari", "dokumen-disiapkan-perusahaan"],
  "armada/motor": ["motor-disewa-harian", "harga-sewa-kendaraan", "termasuk-layanan-sewa", "sewa-lebih-dari"],
  "beranda": ["harga-sewa-kendaraan", "termasuk-layanan-sewa", "dokumen-disiapkan-perusahaan", "sewa-lebih-dari", "motor-disewa-harian"],
  "solusi-bisnis": ["lama-durasi-kontrak", "termasuk-layanan-sewa", "dokumen-disiapkan-perusahaan", "instansi-pemerintah-memesan", "sewa-sopir"],
  "layanan-purna-sewa": ["termasuk-layanan-sewa", "jadwal-servis-unit", "unit-bermasalah-luar", "dilakukan-mogok-kecelakaan"],
  "operasional-sopir": ["sewa-sopir", "layanan-sopir-digabung", "lama-durasi-kontrak", "dokumen-disiapkan-perusahaan"],
  "pengadaan-instansi": ["instansi-pemerintah-memesan", "durasi-sewa-instansi", "termasuk-layanan-sewa", "sewa-sopir"],
  "sewa-jangka-panjang": ["lama-durasi-kontrak", "termasuk-layanan-sewa", "dokumen-disiapkan-perusahaan", "layanan-sopir-digabung"],
  "wuling-cortez-darion": ["unit-ini-disewa", "harga-sewa-bulanan", "termasuk-sewa", "dokumen-disiapkan"],
};
export const faqFor = (page: string): Faq[] => FAQ_PAGES[page].map((k) => FAQ[k]);

