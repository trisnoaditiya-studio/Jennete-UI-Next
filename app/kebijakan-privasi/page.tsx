import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVASI } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Jennete Rent",
  description: "Draf kebijakan privasi Jennete Rent: data yang dikumpulkan lewat formulir, penggunaannya, dan hak Anda.",
  robots: { index: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      intro="Bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda."
      sections={PRIVASI}
      other={["/syarat-ketentuan/", "Syarat & Ketentuan"]}
    />
  );
}
