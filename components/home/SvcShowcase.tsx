"use client";

import { useRef, useState } from "react";
import { Arrow } from "@/components/icons";
import { EMERGENCY } from "@/lib/site";

const ITEMS = [
  {
    title: "Servis berkala terjadwal",
    text: "Servis tiap 10.000 km atau 6 bulan, mana yang lebih dulu. Tim kami mengingatkan sebelum jadwalnya tiba.",
    stat: ["10.000 km", "atau 6 bulan, mana yang lebih dulu"],
  },
  {
    title: "Jaringan ATPM di seluruh Indonesia",
    text: "Jika ada kendala di luar Jakarta, bawa unit ke bengkel resmi merek terkait yang terdekat dari lokasi Anda.",
    stat: ["Bengkel resmi", "sesuai merek unit yang Anda sewa"],
  },
  {
    title: "Bantuan darurat di jalan 24/7",
    text: "Mogok atau kecelakaan, hubungi tim kami dan kami datang ke lokasi.",
    stat: ["24/7", "tim darurat datang ke lokasi"],
    call: true,
  },
];

/* Showcase layanan purna sewa: tab vertikal + panel gambar (hover di desktop, klik, dan panah keyboard) */
export default function SvcShowcase({ title = "Unit tetap jalan, perawatannya kami yang urus", alts }: { title?: string; alts?: string[] }) {
  const [cur, setCur] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (k: number, focus = false) => {
    setCur(k);
    if (focus) tabs.current[k]?.focus();
  };
  return (
    <section id="layanan" aria-labelledby="usp-title">
      <div className="wrap">
        <div className="svc">
          <div className="svc-left">
            <div className="svc-head">
              <h2 id="usp-title">{title}</h2>
              <p className="lead">Layanan purna sewa sudah termasuk dalam setiap kontrak, sehingga tim Anda bisa fokus bekerja.</p>
            </div>
            <div className="svc-list" role="tablist" aria-orientation="vertical" aria-label="Layanan purna sewa">
              {ITEMS.map((it, i) => (
                <div
                  className={`svc-item${i === cur ? " is-active" : ""}`}
                  key={it.title}
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest("a")) go(i);
                  }}
                  onMouseEnter={() => window.matchMedia("(min-width:901px)").matches && go(i)}
                >
                  <img className="svc-thumb" src={`/assets/img/site/svcImg${i + 1}.jpg`} alt="" loading="lazy" />
                  <button
                    className="svc-tab"
                    role="tab"
                    id={`svc-tab-${i}`}
                    aria-selected={i === cur}
                    aria-controls={`svc-panel-${i}`}
                    tabIndex={i === cur ? 0 : -1}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    onKeyDown={(e) => {
                      const k = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key];
                      if (k) {
                        e.preventDefault();
                        go((i + k + ITEMS.length) % ITEMS.length, true);
                      }
                    }}
                  >
                    <h3>{it.title}</h3>
                  </button>
                  <div className="svc-body">
                    <div className="svc-inner">
                      <p>{it.text}</p>
                      {it.call && (
                        <a className="link svc-call" href={`tel:${EMERGENCY.tel}`}>
                          Telepon {EMERGENCY.label}
                          <Arrow />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="svc-stage">
            {ITEMS.map((it, i) => (
              <figure
                className={`svc-panel${i === cur ? " is-active" : ""}`}
                role="tabpanel"
                id={`svc-panel-${i}`}
                aria-labelledby={`svc-tab-${i}`}
                hidden={i !== cur}
                key={it.title}
              >
                <img src={`/assets/img/site/svcImg${i + 1}.jpg`} alt={alts?.[i] ?? `Ilustrasi: ${it.title.toLowerCase()}`} loading="lazy" />
                <figcaption className="svc-stat">
                  <strong>{it.stat[0]}</strong>
                  <span>{it.stat[1]}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
