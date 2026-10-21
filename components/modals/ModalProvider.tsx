"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import QuoteModal from "./QuoteModal";
import ContactWidget from "./ContactWidget";

export type ModalKind = "quote" | "resv";
/* data unit dari tombol pemicu (data-type, data-brand, data-model) */
export type Trigger = { type?: string; brand?: string; model?: string };
/* n = nomor pembukaan (untuk reset form), at = waktu dibuka (status jam kantor) */
export type Opened = { trigger: Trigger; n: number; at: number };
type Active = (Opened & { kind: ModalKind }) | null;

const Ctx = createContext<{ open: (kind: ModalKind, trigger?: Trigger) => void }>({ open: () => {} });
export const useModal = () => useContext(Ctx);

/* Popup "Minta penawaran" dan widget WhatsApp.
   Tombol apa pun dengan atribut data-open="quote" | "resv" membuka popup (termasuk markup di server component). */
export default function ModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Active>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const seq = useRef(0);

  const open = useCallback((kind: ModalKind, trigger: Trigger = {}) => {
    if (typeof HTMLDialogElement === "undefined") return;
    document.dispatchEvent(new Event("jr:closemenus"));
    setActive({ kind, trigger, n: ++seq.current, at: Date.now() });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-open]");
      if (!a || typeof HTMLDialogElement === "undefined") return;
      e.preventDefault();
      lastTrigger.current = a;
      const kind = a.dataset.open === "quote" ? "quote" : "resv";
      open(kind, { type: a.dataset.type, brand: a.dataset.brand, model: a.dataset.model });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  const onClose = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <QuoteModal active={active?.kind === "quote" ? active : null} onClose={onClose} />
      <ContactWidget active={active?.kind === "resv" ? active : null} onClose={onClose} />
    </Ctx.Provider>
  );
}

/* buka/tutup <dialog> sesuai state, dan laporkan saat ditutup (Esc, klik latar, tombol tutup) */
export function useDialog(isOpen: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const h = () => onClose();
    d.addEventListener("close", h);
    return () => d.removeEventListener("close", h);
  }, [onClose]);
  const backdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  };
  const close = () => ref.current?.close();
  return { ref, backdrop, close };
}
