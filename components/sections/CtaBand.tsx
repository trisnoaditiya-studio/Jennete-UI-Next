import type { ReactNode } from "react";
import QuoteButton from "@/components/ui/QuoteButton";
import { PHONE_1 } from "@/lib/site";

/* Pita CTA gelap di akhir halaman. Default: Minta Penawaran + telepon kantor. */
export default function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: ReactNode;
  text: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
}) {
  return (
    <section className="cta-band" aria-labelledby="band-title">
      <div className="wrap cta-band-in">
        <div className="cta-band-copy">
          <h2 id="band-title">{title}</h2>
          <p>{text}</p>
          <div className="cta-band-btns">
            {primary ?? <QuoteButton className="btn btn-white" />}
            {secondary ?? (
              <a className="btn btn-ghost-w" href={`tel:${PHONE_1.tel}`}>
                Telepon {PHONE_1.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
