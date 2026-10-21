"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Arrow } from "@/components/icons";
import FieldError from "@/components/ui/FieldError";
import { catalog, type Jenis } from "@/lib/fleet";
import { errProps, mailOk, MSG, phoneOk, waUrl, type Errors } from "@/lib/forms";
import { useDialog, type Opened } from "./ModalProvider";

const DURS = ["3", "6", "12", "18", "24", "36"];
const X = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

type Props = { active: Opened | null; onClose: () => void };

export default function QuoteModal({ active, onClose }: Props) {
  const { ref, backdrop, close } = useDialog(!!active, onClose);
  const [f, setF] = useState({ name: "", phone: "", email: "", company: "", qty: "1", type: "mobil" as Jenis, brand: "", model: "", dur: "12", driver: false });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ sum: string; mail: string; wa: string } | null>(null);
  const doneTitle = useRef<HTMLHeadingElement>(null);
  const set = (k: keyof typeof f, v: string | boolean) => setF((o) => ({ ...o, [k]: v }));

  const cat = useMemo(() => catalog(f.type), [f.type]);
  const brands = Object.keys(cat).sort();
  const models = cat[f.brand] || [];

  /* dibuka: kembali ke form dan isi unit dari tombol pemicu (penyesuaian state saat render) */
  const [openedN, setOpenedN] = useState(0);
  if (active && active.n !== openedN) {
    setOpenedN(active.n);
    setDone(null);
    const t = active.trigger;
    if (t.brand) setF((o) => ({ ...o, type: (t.type as Jenis) || "mobil", brand: t.brand || "", model: t.model || "" }));
  }
  /* fokus field pertama setelah dialog tampil */
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>("input,select,textarea")?.focus(), 50);
    return () => clearTimeout(t);
  }, [active, ref]);

  const fullForm = () => {
    const p = new URLSearchParams({ jalur: "perusahaan", jenis: f.type });
    if (f.brand) p.set("merek", f.brand);
    if (f.model) p.set("model", f.model);
    p.set("durasi", f.dur);
    const n = parseInt(f.qty);
    if (n > 1) p.set("jumlah", String(n));
    if (f.driver) p.set("sopir", "1");
    return "/pesan/?" + p;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    const v = (x: string) => x.trim();
    if (!v(f.name)) er["q-name"] = MSG.name;
    if (!v(f.phone)) er["q-phone"] = MSG.phoneEmpty;
    else if (!phoneOk(f.phone)) er["q-phone"] = MSG.phoneBad;
    if (!v(f.email)) er["q-email"] = MSG.emailEmpty;
    else if (!mailOk(v(f.email))) er["q-email"] = MSG.emailBad;
    const q = parseInt(f.qty);
    if (!(q >= 1)) er["q-qty"] = "Minimal 1 unit";
    if (!f.brand) er["q-brand"] = "Pilih merek";
    if (!f.model) er["q-model"] = "Pilih model";
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const sum = `${q} unit ${f.brand} ${f.model}, kontrak ${f.dur} bulan${f.type === "mobil" ? (f.driver ? ", termasuk sopir" : ", tanpa sopir") : ""}`;
    const company = v(f.company);
    const wa = waUrl(
      `Halo Jennete Rent, saya ingin minta penawaran sewa.\n\nNama: ${v(f.name)}${company ? "\nPerusahaan: " + company : ""}\nTelepon: ${v(f.phone)}\nEmail: ${v(f.email)}\nKebutuhan: ${sum}\n\nTerima kasih.`,
    );
    setDone({ sum: (company ? company + ": " : "") + sum, mail: v(f.email), wa });
    setTimeout(() => doneTitle.current?.focus(), 0);
  };

  return (
    <dialog className="modal" id="quoteModal" aria-labelledby="qm-title" ref={ref} onClick={backdrop}>
      <form className={`fm${done ? " is-done" : ""}`} id="quoteForm" noValidate onSubmit={submit}>
        <div className="fm-head">
          <div>
            <h2 id="qm-title">Minta penawaran</h2>
            <p>Isi kebutuhan Anda, tim kami menyiapkan penawaran resmi.</p>
          </div>
          <button type="button" className="fm-x" aria-label="Tutup" onClick={close}>
            {X}
          </button>
        </div>
        <div className="fm-body">
          <div className="fm-row">
            <div className="fm-field">
              <label htmlFor="q-name">Nama</label>
              <input id="q-name" name="name" autoComplete="name" required value={f.name} onChange={(e) => set("name", e.target.value)} {...errProps(errors, "q-name")} />
              <FieldError errors={errors} id="q-name" />
            </div>
            <div className="fm-field">
              <label htmlFor="q-phone">Nomor telepon</label>
              <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0812 3456 7890" required value={f.phone} onChange={(e) => set("phone", e.target.value)} {...errProps(errors, "q-phone")} />
              <FieldError errors={errors} id="q-phone" />
            </div>
          </div>
          <div className="fm-row">
            <div className="fm-field">
              <label htmlFor="q-email">Alamat email</label>
              <input id="q-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="nama@perusahaan.co.id" required value={f.email} onChange={(e) => set("email", e.target.value)} {...errProps(errors, "q-email")} />
              <span className="fm-hint">Penawaran resmi dikirim ke email ini</span>
              <FieldError errors={errors} id="q-email" />
            </div>
            <div className="fm-field">
              <label htmlFor="q-company">
                Nama perusahaan <span className="fm-opt">(opsional)</span>
              </label>
              <input id="q-company" name="company" autoComplete="organization" value={f.company} onChange={(e) => set("company", e.target.value)} />
              <span className="fm-hint">Kosongkan jika menyewa atas nama pribadi</span>
            </div>
          </div>
          <div className="fm-field">
            <label htmlFor="q-qty">Jumlah unit</label>
            <div className="fm-step">
              <button type="button" aria-label="Kurangi unit" onClick={() => set("qty", String(Math.min(500, Math.max(1, (parseInt(f.qty) || 1) - 1))))}>
                −
              </button>
              <input id="q-qty" name="qty" type="number" inputMode="numeric" min={1} max={500} required value={f.qty} onChange={(e) => set("qty", e.target.value)} {...errProps(errors, "q-qty")} />
              <button type="button" aria-label="Tambah unit" onClick={() => set("qty", String(Math.min(500, Math.max(1, (parseInt(f.qty) || 1) + 1))))}>
                +
              </button>
            </div>
            <FieldError errors={errors} id="q-qty" />
          </div>
          <fieldset className="fm-field">
            <legend>Kendaraan</legend>
            <div className="fm-seg" role="radiogroup">
              {(["mobil", "motor"] as Jenis[]).map((t) => (
                <label key={t}>
                  <input
                    type="radio"
                    name="q-type"
                    value={t}
                    checked={f.type === t}
                    onChange={() => setF((o) => ({ ...o, type: t, brand: "", model: "", driver: t === "motor" ? false : o.driver }))}
                  />
                  <span>{t === "mobil" ? "Mobil" : "Motor"}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="fm-row">
            <div className="fm-field">
              <label htmlFor="q-brand">Merek</label>
              <select id="q-brand" name="brand" required value={f.brand} onChange={(e) => setF((o) => ({ ...o, brand: e.target.value, model: "" }))} {...errProps(errors, "q-brand")}>
                <option value="">Pilih merek</option>
                {brands.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <FieldError errors={errors} id="q-brand" />
            </div>
            <div className="fm-field">
              <label htmlFor="q-model">Model</label>
              <select id="q-model" name="model" required disabled={!models.length} value={f.model} onChange={(e) => set("model", e.target.value)} {...errProps(errors, "q-model")}>
                <option value="">{models.length ? "Pilih model" : "Pilih merek dulu"}</option>
                {models.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <FieldError errors={errors} id="q-model" />
            </div>
          </div>
          <fieldset className="fm-field">
            <legend>Durasi kontrak</legend>
            <div className="fm-chips fm-dur">
              {DURS.map((d) => (
                <label key={d}>
                  <input type="radio" name="dur" value={d} aria-label={`${d} bulan`} checked={f.dur === d} onChange={() => set("dur", d)} />
                  <span>
                    <b>{d}</b> bulan
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className={`fm-toggle${f.type === "motor" ? " is-off" : ""}`} id="q-driver-wrap">
            <input type="checkbox" id="q-driver" name="driver" disabled={f.type === "motor"} checked={f.driver} onChange={(e) => set("driver", e.target.checked)} />
            <span className="fm-switch" aria-hidden="true"></span>
            <span>
              <b>Termasuk sopir</b>
              <small>Sopir berpengalaman disediakan oleh Jennete Rent</small>
            </span>
          </label>
        </div>
        <div className="fm-foot">
          <button className="btn btn-dark" type="submit">
            Minta Penawaran
          </button>
          <Link className="link fm-full" href={fullForm()} onClick={close}>
            Isi formulir lengkap
            <Arrow />
          </Link>
        </div>
        <div className="fm-done" hidden={!done}>
          <span className="fm-ok" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5 9-10" />
            </svg>
          </span>
          <h3 ref={doneTitle} tabIndex={-1}>
            Permintaan penawaran terkirim
          </h3>
          <p className="fm-sum">{done?.sum}</p>
          <p className="fm-note">
            Penawaran resmi akan dikirim ke <b className="fm-mail">{done?.mail}</b>, dan tim kami menghubungi Anda melalui nomor yang Anda isi. (Simulasi mockup:
            data belum dikirim ke sistem.)
          </p>
          <div className="fm-done-cta">
            <a className="btn btn-outline" id="qWa" href={done?.wa || "#"} target="_blank" rel="noopener">
              Kirim juga via WhatsApp
            </a>
            <button type="button" className="btn btn-dark" onClick={close}>
              Selesai
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
