"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Efek global per halaman: animasi .rv saat terlihat dan langkah "Cara sewa" (.how) */
export default function SiteEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const rv = [...document.querySelectorAll<HTMLElement>(".rv:not(.on)")];
    const how = document.querySelector<HTMLElement>(".how:not(.in-view)");
    if (!("IntersectionObserver" in window)) {
      rv.forEach((x) => x.classList.add("on"));
      how?.classList.add("in-view");
      return;
    }
    const ro = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            ro.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    rv.forEach((x) => ro.observe(x));
    const ho = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            ho.disconnect();
          }
        }),
      { threshold: 0.35 },
    );
    if (how) ho.observe(how);
    return () => {
      ro.disconnect();
      ho.disconnect();
    };
  }, [pathname]);
  return null;
}
