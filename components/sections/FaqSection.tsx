import type { ReactNode } from "react";
import { Arrow } from "@/components/icons";
import { WA_URL } from "@/lib/site";

export type Faq = [string, ReactNode];

/* FAQ akordeon: hanya satu jawaban terbuka (details name="faq"); jawaban pertama terbuka. */
export function FaqList({ items, firstOpen = true }: { items: Faq[]; firstOpen?: boolean }) {
  return (
    <div className="faq-list">
      {items.map(([q, a], i) => (
        <details name="faq" open={firstOpen && i === 0} key={q}>
          <summary>{q}</summary>
          <div className="ans">{a}</div>
        </details>
      ))}
    </div>
  );
}

export default function FaqSection({
  title,
  items,
  lead = "Belum menemukan jawabannya? Tim kami siap membantu.",
}: {
  title: string;
  items: Faq[];
  lead?: string;
}) {
  return (
    <section className="faq-sec" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div>
          <h2 id="faq-title">{title}</h2>
          <p className="lead">{lead}</p>
          <a className="link faq-ask" href={WA_URL}>
            Tanya lewat WhatsApp
            <Arrow />
          </a>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
