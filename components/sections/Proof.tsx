"use client";

import { useEffect, useRef, useState } from "react";
import { Use } from "@/components/icons";

const CLIENTS: [string, string, boolean?][] = [
  ["google", "Google"],
  ["map-fashion", "MAP Fashion", true],
  ["tiktok", "TikTok"],
  ["kb-bukopin", "KB Bukopin"],
  ["takaful-keluarga", "Takaful Keluarga"],
  ["kobelco", "Kobelco"],
];

const TESTI = [
  ["Sejak memakai Jennete Rent untuk mobil dinas, kami tidak lagi repot mengatur jadwal servis. Tim mereka selalu mengingatkan sebelum jadwalnya tiba.", "RA", "Rina A.", "Kepala General Affairs, Perusahaan distribusi"],
  ["Waktu salah satu unit mogok saat perjalanan dinas, tim bantuan langsung datang ke lokasi. Operasional tim lapangan kami tidak terganggu lama.", "BS", "Budi S.", "Operations Manager, Perusahaan konstruksi"],
  ["Proses pengadaan lewat e-Katalog berjalan lancar, dokumen lengkap, dan unit diantar sesuai jadwal yang disepakati.", "DK", "Dewi K.", "Pejabat Pengadaan, Instansi pemerintah daerah"],
];

/* Logo klien + carousel testimoni (auto 8 detik, berhenti saat hover/fokus, swipe) */
export default function Proof() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [tick, setTick] = useState(0);
  const sx = useRef<number | null>(null);
  const n = TESTI.length;
  const go = (k: number) => {
    setI(((k % n) + n) % n);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(i + 1), 8000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, hold, tick]);

  return (
    <section className="proof" aria-labelledby="proof-title">
      <div className="wrap">
        <div className="proof-grid">
          <div>
            <h2 id="proof-title">Dipercaya perusahaan dan instansi</h2>
            <p className="lead">Perusahaan dan instansi yang mempercayakan kebutuhan kendaraannya kepada Jennete Rent.</p>
            <ul className="proof-logos" aria-label="Klien kami">
              {CLIENTS.map(([f, name, tall]) => (
                <li className={`logo-tile${tall ? " tall" : ""}`} key={f}>
                  <img src={`/assets/img/clients/${f}.png`} alt={name} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
          <div
            className="testi"
            aria-roledescription="carousel"
            aria-label="Testimoni klien"
            onMouseEnter={() => setHold(true)}
            onMouseLeave={() => setHold(false)}
            onFocus={() => setHold(true)}
            onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (sx.current === null) return;
              const dx = e.changedTouches[0].clientX - sx.current;
              if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
              sx.current = null;
            }}
          >
            <svg className="q-mark" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="currentColor" d="M20 12v8c-5 0-8 3-8 8h8v12H6V28c0-10 5-16 14-16zm22 0v8c-5 0-8 3-8 8h8v12H28V28c0-10 5-16 14-16z" />
            </svg>
            <div className="t-track" aria-live="polite">
              {TESTI.map(([q, av, name, role], k) => (
                <figure
                  className={`t-slide${k === i ? " is-active" : ""}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${k + 1} dari ${n}`}
                  aria-hidden={k === i ? undefined : true}
                  key={av}
                >
                  <blockquote>
                    <p>{q}</p>
                  </blockquote>
                  <figcaption>
                    <span className="avatar">{av}</span>
                    <span>
                      <b>{name}</b>
                      <small>{role}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="t-ctrl">
              <div className="t-dots" role="tablist" aria-label="Pilih testimoni">
                {TESTI.map((_, k) => (
                  <button role="tab" aria-selected={k === i} aria-label={`Testimoni ${k + 1}`} key={k} onClick={() => go(k)}></button>
                ))}
              </div>
              <div className="t-arrows">
                <button type="button" className="t-prev" aria-label="Testimoni sebelumnya" onClick={() => go(i - 1)}>
                  <Use id="i-left" />
                </button>
                <button type="button" className="t-next" aria-label="Testimoni berikutnya" onClick={() => go(i + 1)}>
                  <Use id="i-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
