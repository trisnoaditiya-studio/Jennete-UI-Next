/* Validasi & utilitas form (sama dengan versi HTML). */
import { WA_NUMBER } from "./site";

export const phoneOk = (v: string) => /^(\+62|62|0)8\d{7,12}$/.test(v.replace(/[\s-]/g, ""));
export const mailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const waUrl = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const MSG = {
  name: "Isi nama Anda",
  phoneEmpty: "Isi nomor telepon",
  phoneBad: "Gunakan format nomor Indonesia, misalnya 0812 3456 7890",
  emailEmpty: "Isi alamat email",
  emailBad: "Format email belum benar, contoh nama@perusahaan.co.id",
};

export type Errors = Record<string, string>;

/* atribut aksesibilitas untuk field yang sedang error */
export const errProps = (errors: Errors, id: string) =>
  errors[id] ? { "aria-invalid": true as const, "aria-describedby": `${id}-err` } : {};

/* simpan ringkasan untuk halaman /terima-kasih/ */
export type OrderSummary = { mode: "wa" | "api"; jalur: string; kendaraan: string; lines: [string, string][]; email?: string; wa: string };
export const storeOrder = (o: OrderSummary) => {
  try {
    sessionStorage.setItem("jr-order", JSON.stringify(o));
  } catch {}
};
