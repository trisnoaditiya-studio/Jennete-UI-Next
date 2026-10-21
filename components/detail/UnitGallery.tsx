"use client";

import { useRef, useState } from "react";
import { Use } from "@/components/icons";

export type Photo = [string, string]; // [src, keterangan]

/* Galeri foto unit: foto utama + thumbnail, panah, geser, dan lightbox (dialog) */
export default function UnitGallery({ name, photos }: { name: string; photos: Photo[] }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0); // foto yang tampil (berganti setelah animasi fade)
  const [fade, setFade] = useState(false);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const box = useRef<HTMLDialogElement>(null);
  const sx = useRef<number | null>(null);
  const n = photos.length;

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const go = (k: number, focus = false) => {
    const next = ((k % n) + n) % n;
    setI(next);
    if (focus) thumbs.current[next]?.focus();
    /* foto berganti setelah animasi fade 180 ms; di lightbox langsung */
    if (timer.current) clearTimeout(timer.current);
    if (box.current?.open) {
      setShown(next);
      return;
    }
    setFade(true);
    timer.current = setTimeout(() => {
      setShown(next);
      setFade(false);
    }, 180);
  };

  const [src, cap] = photos[shown];
  const alt = `${name}, ${cap.toLowerCase()}`;
  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (sx.current = e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => {
      if (sx.current === null) return;
      const dx = e.changedTouches[0].clientX - sx.current;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      sx.current = null;
    },
  };

  return (
    <>
      <div className="gal" aria-roledescription="carousel" aria-label={`Galeri foto ${name}`}>
        <div className="gal-stage" {...swipe}>
          <img src={src} alt={alt} fetchPriority="high" className={`gal-main${fade ? " fade" : ""}`} onClick={() => box.current?.showModal()} />
          <span className="gal-count num" aria-live="polite">
            <b>{i + 1}</b> / <span>{n}</span>
          </span>
          <button type="button" className="gal-nav prev" aria-label="Foto sebelumnya" onClick={() => go(i - 1)}>
            <Use id="i-left" />
          </button>
          <button type="button" className="gal-nav next" aria-label="Foto berikutnya" onClick={() => go(i + 1)}>
            <Use id="i-right" />
          </button>
          <button type="button" className="gal-zoom" aria-label="Perbesar foto" onClick={() => box.current?.showModal()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </button>
          <span className="gal-cap">{cap}</span>
        </div>
        <ul className="gal-thumbs" role="tablist" aria-label="Pilih foto">
          {photos.map(([s, c], k) => (
            <li key={s}>
              <button
                role="tab"
                aria-selected={k === i}
                tabIndex={k === i ? 0 : -1}
                ref={(el) => {
                  thumbs.current[k] = el;
                }}
                onClick={() => go(k)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    go(i + (e.key === "ArrowRight" ? 1 : -1), true);
                  }
                }}
              >
                <img alt={c} src={s} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <dialog
        className="lightbox"
        aria-label="Foto diperbesar"
        ref={box}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(i + 1);
          if (e.key === "ArrowLeft") go(i - 1);
        }}
      >
        <img src={src} alt={alt} />
        <button type="button" className="lb-x" aria-label="Tutup" onClick={() => box.current?.close()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <button type="button" className="gal-nav prev lb" aria-label="Foto sebelumnya" onClick={() => go(i - 1)}>
          <Use id="i-left" />
        </button>
        <button type="button" className="gal-nav next lb" aria-label="Foto berikutnya" onClick={() => go(i + 1)}>
          <Use id="i-right" />
        </button>
        <span className="gal-cap lb">{cap}</span>
      </dialog>
    </>
  );
}
