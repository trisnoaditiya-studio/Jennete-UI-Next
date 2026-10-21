import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { SYARAT } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Jennete Rent",
  description: "Draf syarat dan ketentuan sewa kendaraan Jennete Rent: pemesanan, dokumen, harga, penggunaan unit, servis, dan bantuan darurat.",
  robots: { index: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Syarat & Ketentuan"
      intro="Ketentuan yang berlaku untuk penyewaan mobil dan motor di Jennete Rent, untuk perusahaan, instansi, dan perorangan."
      sections={SYARAT}
      other={["/kebijakan-privasi/", "Kebijakan Privasi"]}
    />
  );
}
