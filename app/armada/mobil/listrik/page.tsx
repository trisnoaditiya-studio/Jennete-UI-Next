import type { Metadata } from "next";
import ArmadaPage from "@/components/armada/ArmadaPage";
import { ARMADA_PAGES } from "@/lib/armada";

const p = ARMADA_PAGES["armada/mobil/listrik"];
export const metadata: Metadata = p.meta;

export default function Page() {
  return <ArmadaPage p={p} />;
}
