import type { Metadata } from "next";
import { WaIcon } from "@/components/brand-icons";
import OrderForm from "@/components/forms/OrderForm";
import SbHero from "@/components/sections/SbHero";
import { WA_DISPLAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pesan Kendaraan | Jennete Rent",
  description: "Formulir pemesanan kendaraan Jennete Rent untuk perusahaan, instansi, dan perorangan. Pilih unit, durasi, dan kebutuhan sopir.",
};

export default function Pesan() {
  return (
    <>
      <SbHero
        className="ps-hero"
        img="/assets/img/site/hero-pesan.webp"
        pos="60% center"
        crumbs={[["Beranda", "/"], ["Pesan kendaraan"]]}
        title="Pesan kendaraan"
        sub="Pilih jalur pemesanan, isi kebutuhan Anda, lalu kirim. Tim kami menindaklanjuti melalui kontak yang Anda isi."
        factCards={[
          ["doc", "Penawaran resmi", "untuk perusahaan dan instansi"],
          [<WaIcon key="wa" />, "WhatsApp", WA_DISPLAY],
          ["wrench", "Termasuk perawatan", "servis dan darurat 24/7"],
        ]}
      />
      <section className="ps-sec" aria-label="Formulir pemesanan">
        <div className="wrap">
          <OrderForm />
        </div>
      </section>
    </>
  );
}
