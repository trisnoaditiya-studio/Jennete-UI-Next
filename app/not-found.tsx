import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Ic } from "@/components/icons";
import { WA_DISPLAY, WA_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Halaman tidak ditemukan | Jennete Rent", robots: { index: false } };

const CARDS = [
  ["/armada/", "steps", "Armada", "Mobil dan motor yang tersedia"],
  ["/solusi-bisnis/", "building", "Solusi bisnis", "Sewa jangka panjang dan pengadaan"],
  ["/pesan/", "doc2", "Pesan kendaraan", "Kirim kebutuhan unit dan durasi"],
  ["/bantuan/", "help", "Bantuan", "Pertanyaan umum dan cara sewa"],
  ["/artikel/", "cal2", "Artikel", "Tips sewa dan panduan"],
  ["/kontak/", "phone", "Kontak", "WhatsApp, telepon, dan alamat"],
];

/* 404: static export menghasilkan out/404.html */
export default function NotFound() {
  return (
    <>
      <section className="sb-hero sub ls nf-hero" aria-labelledby="pg-title">
        <div className="sb-media">
          <img src="/assets/img/site/hero-armada-mobil.webp" alt="" fetchPriority="high" />
        </div>
        <div className="sb-scrim" aria-hidden="true"></div>
        <div className="wrap sb-hero-in">
          <p className="nf-code" aria-hidden="true">
            404
          </p>
          <h1 id="pg-title">Halaman tidak ditemukan</h1>
          <p className="sub">Alamat yang Anda buka mungkin salah ketik, sudah dipindahkan, atau tidak lagi tersedia.</p>
          <div className="cta-band-btns">
            <Link className="btn btn-white" href="/">
              Kembali ke beranda
              <Arrow />
            </Link>
            <Link className="btn btn-ghost-w" href="/armada/">
              Lihat armada
            </Link>
          </div>
        </div>
      </section>
      <section className="sec-soft nf-links" aria-labelledby="nf-title">
        <div className="wrap">
          <h2 id="nf-title">Mungkin Anda mencari</h2>
          <ul className="bt-cards">
            {CARDS.map(([href, icon, t, d]) => (
              <li key={href}>
                <Link href={href}>
                  <span className="hl-ic" aria-hidden="true">
                    <Ic name={icon} sw={1.7} />
                  </span>
                  <b>{t}</b>
                  <small>{d}</small>
                </Link>
              </li>
            ))}
          </ul>
          <p className="nf-help">
            Masih belum menemukan yang dicari? Hubungi kami di{" "}
            <a href={WA_URL} target="_blank" rel="noopener">
              WhatsApp {WA_DISPLAY}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
