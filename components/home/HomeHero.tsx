"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/client";
import { Use } from "@/components/icons";
import QuoteButton from "@/components/ui/QuoteButton";
import { EMERGENCY } from "@/lib/site";

type Slide = { img: string; eyebrow: ReactNode; title: string; sub: string; cta: ReactNode; facts: [string, string][]; dot: string };

const SLIDES: Slide[] = [
  {
    img: "heroImg1",
    eyebrow: (
      <>
        <b>Lexus LM 350h</b>
        <span className="chip">Hybrid</span>
      </>
    ),
    title: "Sewa mobil jangka panjang untuk perusahaan di Jakarta",
    sub: "Unit terawat, servis berkala kami jadwalkan, dan bantuan darurat 24/7. Melayani perusahaan, instansi pemerintah, dan perorangan.",
    cta: (
      <>
        <QuoteButton />
        <a className="btn btn-ghost-w" href="#armada">
          Lihat Armada
        </a>
      </>
    ),
    facts: [
      ["Sejak 2010", "beroperasi di Jakarta"],
      ["e-Katalog LKPP", "penyedia terdaftar"],
      ["24/7", "bantuan darurat"],
    ],
    dot: "Sewa jangka panjang",
  },
  {
    img: "heroImg2",
    eyebrow: (
      <>
        <b>Jetour T2</b>
        <span className="chip">Bensin</span>
      </>
    ),
    title: "SUV tangguh untuk mobilitas tim Anda",
    sub: "Kabin lega dan penggerak segala medan untuk perjalanan dinas di dalam maupun luar kota. Tersedia dengan kontrak bulanan atau tahunan.",
    cta: (
      <>
        <Link className="btn btn-dark" href="/armada/mobil/?kategori=SUV">
          Lihat armada SUV
        </Link>
        <QuoteButton className="btn btn-ghost-w" />
      </>
    ),
    facts: [
      ["Jetour T2", "mulai Rp1.750.000/hari"],
      ["2.000 cc turbo", "otomatis XWD"],
    ],
    dot: "SUV untuk tim",
  },
  {
    img: "heroImg3",
    eyebrow: <b>Layanan purna sewa</b>,
    title: "Unit tetap jalan, perawatannya kami yang urus",
    sub: "Servis tiap 10.000 km atau 6 bulan, jaringan bengkel resmi ATPM di seluruh Indonesia, dan tim darurat yang datang ke lokasi.",
    cta: (
      <>
        <a className="btn btn-dark" href="#layanan">
          Lihat layanan
        </a>
        <a className="btn btn-ghost-w" href={`tel:${EMERGENCY.tel}`}>
          Bantuan darurat 24/7
        </a>
      </>
    ),
    facts: [
      ["10.000 km", "interval servis berkala"],
      [EMERGENCY.label, "darurat 24 jam"],
    ],
    dot: "Layanan purna sewa",
  },
];

const DUR = 7000;

/* Hero carousel beranda: auto-play 7 detik, jeda saat hover / tombol jeda, panah, geser (swipe), dan tombol keyboard */
export default function HomeHero() {
  const [idx, setIdx] = useState(0);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [userPaused, setUserPaused] = useState<boolean | null>(null); // null = belum diubah pengguna
  const paused = userPaused ?? reduce;
  const [hoverPause, setHoverPause] = useState(false);
  const [cycle, setCycle] = useState(0); // memulai ulang animasi progres titik
  const sx = useRef<number | null>(null);
  const n = SLIDES.length;

  const go = useCallback((k: number) => {
    setIdx(((k % n) + n) % n);
    setCycle((c) => c + 1);
  }, [n]);

  useEffect(() => {
    if (paused || hoverPause) return;
    const t = setTimeout(() => go(idx + 1), DUR);
    return () => clearTimeout(t);
  }, [idx, paused, hoverPause, cycle, go]);

  return (
    <section
      className={`hero${paused || hoverPause ? " paused" : ""}`}
      id="hero"
      aria-roledescription="carousel"
      aria-labelledby="hero-title"
      onMouseEnter={() => !paused && setHoverPause(true)}
      onMouseLeave={() => {
        if (hoverPause) {
          setHoverPause(false);
          go(idx);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(idx + 1);
        if (e.key === "ArrowLeft") go(idx - 1);
      }}
      onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (sx.current === null) return;
        const dx = e.changedTouches[0].clientX - sx.current;
        if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
        sx.current = null;
      }}
    >
      {SLIDES.map((s, i) => {
        const on = i === idx;
        const H = i === 0 ? "h1" : "h2";
        return (
          <div
            className={`slide slide-${i + 1}${on ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${n}`}
            aria-hidden={on ? undefined : true}
            inert={!on}
            key={s.img}
          >
            <div className="slide-media">
              <img src={`/assets/img/site/${s.img}.jpg`} alt="" fetchPriority={i === 0 ? "high" : undefined} loading={i === 0 ? undefined : "lazy"} />
            </div>
            <div className="scrim" aria-hidden="true"></div>
            <div className="slide-content">
              <div className="wrap">
                <div className="eyebrow anim">{s.eyebrow}</div>
                <H className="anim" id={i === 0 ? "hero-title" : undefined}>
                  {s.title}
                </H>
                <p className="sub anim">{s.sub}</p>
                <div className="anim">
                  <div className="hero-cta">{s.cta}</div>
                  <div className="hero-facts">
                    {s.facts.map(([a, b]) => (
                      <div key={a}>
                        <strong>{a}</strong>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="hero-ui">
        <div className="wrap">
          <button className="hero-btn" type="button" aria-label="Slide sebelumnya" onClick={() => go(idx - 1)}>
            <Use id="i-left" />
          </button>
          <div className="dots" role="tablist" aria-label="Pilih slide">
            {SLIDES.map((s, i) => (
              <button
                className={`dot${i === idx ? " is-active" : ""}${i < idx ? " is-done" : ""}`}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Slide ${i + 1}: ${s.dot}`}
                key={s.dot}
                onClick={() => go(i)}
              >
                <span>{s.dot}</span>
                <i key={i === idx ? cycle : 0}></i>
              </button>
            ))}
          </div>
          <button className="hero-btn" type="button" aria-label="Slide berikutnya" onClick={() => go(idx + 1)}>
            <Use id="i-right" />
          </button>
          <button
            className="hero-btn"
            type="button"
            aria-label={paused ? "Putar slide otomatis" : "Jeda slide otomatis"}
            onClick={() => {
              setUserPaused(!paused);
              if (paused) go(idx);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d={paused ? "M8 5v14l11-7z" : "M7 5h3v14H7zM14 5h3v14h-3z"} />
            </svg>
          </button>
          <span className="counter" aria-hidden="true">
            <b>{String(idx + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
