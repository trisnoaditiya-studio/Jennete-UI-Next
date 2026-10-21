import type { ReactNode } from "react";
import { QUOTE_URL } from "@/lib/site";

/* Tombol yang membuka popup "Minta penawaran" (fallback: WhatsApp). brand/model mengisi unit di form. */
export default function QuoteButton({
  className = "btn btn-dark",
  children = "Minta Penawaran",
  type,
  brand,
  model,
}: {
  className?: string;
  children?: ReactNode;
  type?: string;
  brand?: string;
  model?: string;
}) {
  return (
    <a className={className} href={QUOTE_URL} data-open="quote" data-type={type} data-brand={brand} data-model={model} aria-haspopup="dialog">
      {children}
    </a>
  );
}
