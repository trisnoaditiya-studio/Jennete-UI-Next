/* Data kontak & konstanta situs. Satu sumber untuk header, footer, form, dan halaman. */
export const WA_NUMBER = "628881111508";
export const WA_DISPLAY = "0888-1111-508";
export const WA_URL = `https://wa.me/${WA_NUMBER}`;
export const waLink = (text: string) => `${WA_URL}?text=${encodeURIComponent(text)}`;

/* fallback tombol "Minta Penawaran" bila popup tidak tersedia */
export const QUOTE_URL =
  "https://wa.me/628881111508?text=Halo%20Jennete%20Rent%2C%20saya%20ingin%20minta%20penawaran%20sewa%20kendaraan%20untuk%20perusahaan.";

export const PHONE_1 = { tel: "0216124436", label: "(021) 612 4436" };
export const PHONE_2 = { tel: "0216121842", label: "(021) 612 1842" };
export const EMERGENCY = { tel: "08881111508", label: "0888-1111-508" };
export const EMAIL = "rent@jennete.com";
export const ADDRESS = "Jl. Pangeran Jayakarta No. 73, Jakarta";
export const HOURS = "Senin–Jumat 08.00–18.00 · Sabtu 08.00–15.00";
export const COMPANY = "PT Roda Mandiri Jaya";
export const SITE_NAME = "Jennete Rent";

export const rp = (n: number) => "Rp" + n.toLocaleString("id-ID");

/* Integrasi backend formulir (lihat docs/integrasi-pesan.md).
   Kosong → pesan disusun dan dibuka di WhatsApp. Diisi URL API → data dikirim sebagai POST JSON. */
export const ORDER_ENDPOINT = process.env.NEXT_PUBLIC_ORDER_ENDPOINT || "";
export const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";
