import FleetListing from "./FleetListing";
import { Collections, Strip } from "./ArmadaSections";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IncList from "@/components/sections/IncList";
import SbHero from "@/components/sections/SbHero";
import QuoteButton from "@/components/ui/QuoteButton";
import type { ArmadaPage as Cfg } from "@/lib/armada";
import { faqFor } from "@/lib/faqs";

/* Template halaman listing armada (/armada/, /armada/mobil/, /armada/motor/, listrik, premium) */
export default function ArmadaPage({ p }: { p: Cfg }) {
  const h = p.hero;
  return (
    <>
      <SbHero
        img={`/assets/img/site/${h.img}`}
        pos={h.pos}
        crumbs={h.crumbs}
        title={h.title}
        sub={h.sub}
        cta={
          <>
            <QuoteButton />
            <a className="btn btn-ghost-w" href="#daftar">
              Lihat unit
            </a>
          </>
        }
        factCards={h.facts}
      />
      {p.strip && <Strip {...p.strip} />}
      <FleetListing units={p.units} cfg={p.listing} />
      <Collections skip={p.collectionsSkip} />
      {p.inc && <IncList title="Sudah termasuk di setiap unit" />}
      <FaqSection title={p.faqTitle} items={faqFor(p.key)} />
      <CtaBand title={p.cta[0]} text={p.cta[1]} />
    </>
  );
}
