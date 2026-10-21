"use client";

import { useSyncExternalStore } from "react";

/* Nilai yang hanya ada di browser. Saat prerender (static export) bernilai null,
   lalu terisi setelah hidrasi tanpa hydration mismatch. */

const onPop = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  window.addEventListener("pageshow", cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener("pageshow", cb);
  };
};
/* query string halaman saat ini (tanpa "?"); null saat prerender */
export const useSearch = () =>
  useSyncExternalStore(
    onPop,
    () => window.location.search.replace(/^\?/, ""),
    () => null,
  );

export const useMediaQuery = (q: string) =>
  useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(q);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(q).matches,
    () => false,
  );

const noSub = () => () => {};
/* isi sessionStorage (string mentah); null saat prerender atau bila tidak tersedia */
export const useSessionItem = (key: string) =>
  useSyncExternalStore(
    noSub,
    () => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
