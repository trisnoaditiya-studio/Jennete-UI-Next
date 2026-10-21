"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AskIcon, CarIcon, DateIcon, HelpIcon, WaIcon } from "@/components/brand-icons";
import FieldError from "@/components/ui/FieldError";
import { errProps, mailOk, MSG, waUrl, type Errors } from "@/lib/forms";
import { useDialog, type Opened } from "./ModalProvider";

const TOPICS: [string, ReactNode, string][] = [
  ["Rental kendaraan", <CarIcon key="c" />, "Sewa mobil atau motor, harian hingga tahunan"],
  ["Cek ketersediaan", <DateIcon key="d" />, "Pastikan unit tersedia di tanggal Anda"],
  ["Tanya informasi", <HelpIcon key="h" />, "Harga, dokumen, servis, dan layanan"],
  ["Lainnya", <AskIcon key="a" />, "Pertanyaan atau keperluan lain"],
];
const CHEV = (
  <svg className="wc-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6l6 6-6 6" />
  </svg>
);
const X = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/* status jam kantor (WIB): Senin–Jumat 08.00–18.00, Sabtu 08.00–15.00 */
function officeStatus(now: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" })
      .formatToParts(now)
      .map((x) => [x.type, x.value]),
  );
  const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
  const m = +p.hour * 60 + +p.minute;
  const close = d === 0 ? 0 : d === 6 ? 15 * 60 : 18 * 60;
  const open = d !== 0 && m >= 480 && m < close;
  const when = d !== 0 && m < 480 ? "hari ini" : d === 6 ? "Senin" : "besok";
  return { open, text: open ? "Jam kantor · tim kami siap membalas" : `Di luar jam kantor · buka ${when} 08.00 WIB` };
}

type Props = { active: Opened | null; onClose: () => void };

/* Widget "Hubungi via WhatsApp": pilih topik, lalu nama + email */
export default function ContactWidget({ active, onClose }: Props) {
  const { ref, backdrop, close } = useDialog(!!active, onClose);
  const [step, setStep] = useState<1 | 2>(1);
  const [goal, setGoal] = useState("");
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [doneUrl, setDoneUrl] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const firstTopic = useRef<HTMLButtonElement>(null);

  const focusStep = (n: 1 | 2) => setTimeout(() => (n === 2 ? nameRef.current : firstTopic.current)?.focus(), 60);
  const go = (n: 1 | 2, g?: string) => {
    setStep(n);
    if (g) setGoal(g);
    focusStep(n);
  };

  /* dibuka: unit dari tombol pemicu → langsung langkah 2 ("Cek ketersediaan"), selain itu langkah 1 */
  const [openedN, setOpenedN] = useState(0);
  const [opened, setOpened] = useState<Opened | null>(null);
  if (active && active.n !== openedN) {
    setOpenedN(active.n);
    setOpened(active);
    setDoneUrl(null);
    const t = active.trigger;
    const u = t.brand ? `${t.brand} ${t.model || ""}`.trim() : "";
    setUnit(u);
    setStep(u ? 2 : 1);
    if (u) setGoal("Cek ketersediaan");
  }
  useEffect(() => {
    if (!active) return;
    const t = focusStep(active.trigger.brand ? 2 : 1);
    return () => clearTimeout(t);
  }, [active]);
  const status = opened ? officeStatus(new Date(opened.at)) : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 2) return go(1);
    const er: Errors = {};
    if (!name.trim()) er["r-name"] = MSG.name;
    if (!email.trim()) er["r-email"] = MSG.emailEmpty;
    else if (!mailOk(email.trim())) er["r-email"] = MSG.emailBad;
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) return document.getElementById(first)?.focus();
    const lines = ["Halo Jennete Rent,", "", "Tujuan: " + goal, "Nama: " + name.trim(), "Email: " + email.trim()];
    if (unit) lines.push("Unit: " + unit);
    lines.push("", "Terima kasih.");
    const url = waUrl(lines.join("\n"));
    setDoneUrl(url);
    window.open(url, "_blank", "noopener");
  };

  return (
    <dialog className="modal wc-modal" id="resvModal" aria-labelledby="rm-title" ref={ref} onClick={backdrop}>
      <form className={`fm wc${doneUrl ? " is-done" : ""}`} id="resvForm" data-step={step} noValidate onSubmit={submit}>
        <div className="wc-head">
          <span className="wc-badge" aria-hidden="true">
            <WaIcon />
          </span>
          <div>
            <h2 id="rm-title">Ada yang bisa kami bantu?</h2>
            <p className={`wc-status${status?.open ? " is-on" : ""}`}>
              <i aria-hidden="true"></i>
              <span>{status?.text || "Tim Jennete Rent"}</span>
            </p>
          </div>
          <button type="button" className="fm-x" aria-label="Tutup" onClick={close}>
            {X}
          </button>
        </div>
        <p className="wc-note" hidden={!status || status.open}>
          Pesan tetap bisa dikirim sekarang. Tim kami membalas pada jam kantor.
        </p>
        <div className="fm-body">
          <div className="wc-step" data-step-pane="1" hidden={step !== 1}>
            <p className="wc-eyebrow" id="wc-pick">
              Pilih topik
            </p>
            <ul className="wc-topics" aria-labelledby="wc-pick">
              {TOPICS.map(([t, icon, desc], i) => (
                <li key={t}>
                  <button type="button" className="wc-topic" ref={i === 0 ? firstTopic : undefined} onClick={() => go(2, t)}>
                    <span className="wc-ic-box">{icon}</span>
                    <span className="wc-txt">
                      <b>{t}</b>
                      <small>{desc}</small>
                    </span>
                    {CHEV}
                  </button>
                </li>
              ))}
            </ul>
            <p className="wc-more">
              Butuh penawaran resmi?{" "}
              <Link href="/pesan/" onClick={close}>
                Isi formulir pesan →
              </Link>
            </p>
          </div>
          <div className="wc-step" data-step-pane="2" hidden={step !== 2}>
            <div className="wc-chosen">
              <div>
                <span>Topik</span>
                <b>{goal}</b>
              </div>
              <button type="button" className="wc-change" onClick={() => go(1)}>
                Ganti
              </button>
            </div>
            <p className="fm-unit" hidden={!unit}>
              Unit yang dipilih: <b>{unit}</b>
            </p>
            <div className="fm-field">
              <label htmlFor="r-name">Nama</label>
              <input id="r-name" ref={nameRef} name="name" autoComplete="name" placeholder="Nama Anda" required value={name} onChange={(e) => setName(e.target.value)} {...errProps(errors, "r-name")} />
              <FieldError errors={errors} id="r-name" />
            </div>
            <div className="fm-field">
              <label htmlFor="r-email">Email</label>
              <input id="r-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="nama@perusahaan.co.id" required value={email} onChange={(e) => setEmail(e.target.value)} {...errProps(errors, "r-email")} />
              <FieldError errors={errors} id="r-email" />
            </div>
          </div>
        </div>
        <div className="fm-foot">
          <button className="btn btn-wa" type="submit">
            <WaIcon />
            Lanjut ke WhatsApp
          </button>
        </div>
        <div className="fm-done" hidden={!doneUrl}>
          <span className="fm-ok wa" aria-hidden="true">
            <WaIcon />
          </span>
          <h3>Membuka WhatsApp…</h3>
          <p className="fm-note">Jika WhatsApp tidak terbuka otomatis, tekan tombol di bawah. Pesan Anda sudah terisi.</p>
          <div className="fm-done-cta">
            <a className="btn btn-wa" id="rWa" href={doneUrl || "#"} target="_blank" rel="noopener">
              Buka WhatsApp
            </a>
            <button type="button" className="btn btn-outline" onClick={close}>
              Tutup
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
