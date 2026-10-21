import type { Metadata } from "next";
import Link from "next/link";
import { WaIcon } from "@/components/brand-icons";
import { Arrow, Ic } from "@/components/icons";
import ContactForm from "@/components/forms/ContactForm";
import SbHero from "@/components/sections/SbHero";
import { ADDRESS, EMAIL, EMERGENCY, HOURS, PHONE_1, PHONE_2, WA_DISPLAY, WA_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak | Jennete Rent",
  description: "Hubungi Jennete Rent: WhatsApp 0888-1111-508, telepon (021) 612 4436, email rent@jennete.com. Kantor di Jl. Pangeran Jayakarta No. 73, Jakarta.",
};

const MAPS = "https://www.google.com/maps/search/?api=1&query=Jl.%20Pangeran%20Jayakarta%20No.%2073%20Jakarta";
const hl = (icon: React.ReactNode) => (
  <span className="hl-ic" aria-hidden="true">
    {typeof icon === "string" ? <Ic name={icon} sw={1.7} /> : icon}
  </span>
);

export default function Kontak() {
  return (
    <>
      <SbHero
        className="kt-hero"
        img="/assets/img/site/hero-kontak.webp"
        crumbs={[["Beranda", "/"], ["Kontak"]]}
        title="Hubungi kami"
        sub="Kirim pesan, telepon, atau datang ke kantor kami. Untuk kendala di jalan, tim darurat siaga 24 jam."
      />
      <section className="ps-sec" aria-label="Formulir dan kanal kontak">
        <div className="wrap kt-grid">
          <ContactForm />
          <div className="kt-side">
            <ul className="ab-contact">
              <li>
                {hl(<WaIcon />)}
                <div>
                  <b>WhatsApp</b>
                  <a href={WA_URL} target="_blank" rel="noopener">
                    {WA_DISPLAY}
                  </a>
                </div>
              </li>
              <li>
                {hl("phone")}
                <div>
                  <b>Telepon kantor</b>
                  <a href={`tel:${PHONE_1.tel}`}>{PHONE_1.label}</a> · <a href={`tel:${PHONE_2.tel}`}>{PHONE_2.label}</a>
                </div>
              </li>
              <li>
                {hl("mail")}
                <div>
                  <b>Email</b>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </li>
              <li>
                {hl("clock")}
                <div>
                  <b>Jam kantor</b>
                  <span>{HOURS}</span>
                </div>
              </li>
            </ul>
            <ul className="bt-cards">
              <li>
                <a className="sos" href={`tel:${EMERGENCY.tel}`}>
                  {hl("phone")}
                  <b>Bantuan darurat 24/7</b>
                  <small>Mogok atau kecelakaan: {EMERGENCY.label}</small>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="sec-soft" id="lokasi" aria-labelledby="lok-title">
        <div className="wrap ab-office">
          <div>
            <h2 id="lok-title">Kantor kami</h2>
            <p className="lead">Datang langsung untuk konsultasi kebutuhan kendaraan perusahaan Anda.</p>
            <ul className="ab-contact kt-office-list">
              <li>
                {hl("pin")}
                <div>
                  <b>Alamat</b>
                  <span>{ADDRESS}</span>
                </div>
              </li>
              <li>
                {hl("help")}
                <div>
                  <b>Pertanyaan umum</b>
                  <Link href="/bantuan/#faq">Lihat jawaban di halaman Bantuan</Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="ab-map">
            <span className="trust-ic" aria-hidden="true">
              <Ic name="pin" sw={1.7} />
            </span>
            <h3>{ADDRESS}</h3>
            <p>{HOURS}</p>
            <a className="btn btn-white" href={MAPS} target="_blank" rel="noopener">
              Buka di Google Maps
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
