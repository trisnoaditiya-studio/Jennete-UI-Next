"use client";

import { useEffect, useState } from "react";

/* Id bagian yang sedang dibaca: judul terakhir yang sudah melewati 40% tinggi layar.
   Sebelum bagian pertama tercapai → null (kecuali section induknya sudah lewat garis). */
export default function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");
  useEffect(() => {
    let raf = 0;
    const spy = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let cur: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      if (!cur && ids[0]) {
        const sec = document.getElementById(ids[0])?.closest("section");
        if (sec && sec.getBoundingClientRect().top < line) cur = ids[0];
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(spy);
    };
    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", spy);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", spy);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}
