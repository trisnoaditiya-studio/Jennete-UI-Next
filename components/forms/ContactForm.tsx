"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FieldError from "@/components/ui/FieldError";
import { errProps, mailOk, MSG, phoneOk, storeOrder, waUrl, type Errors } from "@/lib/forms";
import { CONTACT_ENDPOINT } from "@/lib/site";
import { useSearch } from "@/lib/client";

const TOPICS = ["Pertanyaan umum", "Penawaran sewa", "Layanan dan servis", "Kerja sama", "Lainnya"];

/* Formulir /kontak/: topik (bisa dari ?topik=), lalu kirim ke WhatsApp atau API */
export default function ContactForm() {
  const router = useRouter();
  const [f, setF] = useState({ topik: TOPICS[0], name: "", company: "", phone: "", email: "", msg: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failWa, setFailWa] = useState<string | null>(null);
  const set = (k: keyof typeof f, v: string) => {
    setF((o) => ({ ...o, [k]: v }));
    const id = "k-" + k;
    if (errors[id])
      setErrors((o) => {
        const rest = { ...o };
        delete rest[id];
        return rest;
      });
  };

  /* topik dari ?topik= (sekali setelah hidrasi) */
  const search = useSearch();
  const [prefilled, setPrefilled] = useState(false);
  if (search !== null && !prefilled) {
    setPrefilled(true);
    const q = new URLSearchParams(search).get("topik");
    if (q && TOPICS.includes(q)) setF((o) => ({ ...o, topik: q }));
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailWa(null);
    const v = (x: string) => x.trim();
    const ph = v(f.phone),
      em = v(f.email);
    const er: Errors = {};
    if (!v(f.name)) er["k-name"] = MSG.name;
    if (!ph) er["k-phone"] = MSG.phoneEmpty;
    else if (!phoneOk(ph)) er["k-phone"] = MSG.phoneBad;
    if (em && !mailOk(em)) er["k-email"] = "Format email belum benar";
    if (v(f.msg).length < 10) er["k-msg"] = "Tulis pesan minimal 10 karakter";
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) return document.getElementById(first)?.focus();

    const data = {
      jenis: "kontak",
      topik: f.topik,
      pesan: v(f.msg),
      kontak: { nama: v(f.name), telepon: ph, email: em || null, perusahaan: v(f.company) || null },
      sumber: window.location.href,
      dikirim: new Date().toISOString(),
    };
    const msg = [
      "Halo Jennete Rent, saya ingin bertanya.",
      "",
      "Topik: " + data.topik,
      "Nama: " + data.kontak.nama,
      ...(data.kontak.perusahaan ? ["Perusahaan: " + data.kontak.perusahaan] : []),
      "Telepon: " + ph,
      ...(em ? ["Email: " + em] : []),
      "",
      "Pesan:",
      data.pesan,
    ].join("\n");
    const wa = waUrl(msg);
    const store = (mode: "wa" | "api") =>
      storeOrder({ mode, jalur: "kontak", kendaraan: "Pesan: " + data.topik, lines: [["Nama", data.kontak.nama], ["Telepon", ph]], email: em, wa });
    if (CONTACT_ENDPOINT) {
      setSending(true);
      try {
        const r = await fetch(CONTACT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(String(r.status));
        store("api");
        router.push("/terima-kasih/");
      } catch {
        setSending(false);
        setFailWa(wa);
      }
    } else {
      store("wa");
      window.open(wa, "_blank", "noopener");
      router.push("/terima-kasih/");
    }
  };

  return (
    <form className="kt-form" id="contactForm" noValidate onSubmit={submit}>
      <h2>Kirim pesan</h2>
      <p>Tim kami membalas melalui kontak yang Anda isi pada jam kantor.</p>
      <fieldset className="fm-field kt-topics">
        <legend>Topik</legend>
        <div className="fm-chips">
          {TOPICS.map((t) => (
            <label key={t}>
              <input type="radio" name="topik" value={t} autoComplete="off" checked={f.topik === t} onChange={() => set("topik", t)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="kt-hint" hidden={f.topik !== "Penawaran sewa"}>
        Untuk penawaran, gunakan <Link href="/pesan/">formulir Pesan kendaraan</Link> agar tim kami langsung mendapat detail unit, jumlah, dan durasi.
      </p>
      <div className="fm-row">
        <div className="fm-field">
          <label htmlFor="k-name">Nama</label>
          <input id="k-name" name="nama" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} {...errProps(errors, "k-name")} />
          <FieldError errors={errors} id="k-name" />
        </div>
        <div className="fm-field">
          <label htmlFor="k-company">
            Perusahaan / instansi <span className="fm-opt">(opsional)</span>
          </label>
          <input id="k-company" name="perusahaan" autoComplete="organization" value={f.company} onChange={(e) => set("company", e.target.value)} />
        </div>
      </div>
      <div className="fm-row">
        <div className="fm-field">
          <label htmlFor="k-phone">Nomor telepon</label>
          <input id="k-phone" name="telepon" type="tel" inputMode="tel" autoComplete="tel" placeholder="0812 3456 7890" value={f.phone} onChange={(e) => set("phone", e.target.value)} {...errProps(errors, "k-phone")} />
          <FieldError errors={errors} id="k-phone" />
        </div>
        <div className="fm-field">
          <label htmlFor="k-email">
            Alamat email <span className="fm-opt">(opsional)</span>
          </label>
          <input id="k-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="nama@perusahaan.co.id" value={f.email} onChange={(e) => set("email", e.target.value)} {...errProps(errors, "k-email")} />
          <FieldError errors={errors} id="k-email" />
        </div>
      </div>
      <div className="fm-field">
        <label htmlFor="k-msg">Pesan</label>
        <textarea id="k-msg" name="pesan" rows={5} placeholder="Tulis pertanyaan atau kebutuhan Anda" value={f.msg} onChange={(e) => set("msg", e.target.value)} {...errProps(errors, "k-msg")} />
        <FieldError errors={errors} id="k-msg" />
      </div>
      <p className="ps-err" role="alert" hidden={!failWa}>
        Pesan belum terkirim. Coba lagi, atau{" "}
        <a href={failWa || "#"} target="_blank" rel="noopener">
          kirim lewat WhatsApp
        </a>
        .
      </p>
      <button className="btn btn-dark" type="submit" disabled={sending}>
        {sending ? "Mengirim…" : "Kirim pesan"}
      </button>
      <p className="ps-fine">Dengan mengirim, Anda setuju dihubungi tim Jennete Rent melalui telepon, WhatsApp, atau email terkait pesan ini.</p>
    </form>
  );
}
