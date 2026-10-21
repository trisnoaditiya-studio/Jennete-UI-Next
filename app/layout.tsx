import type { Metadata, Viewport } from "next";
import "@/styles/style.css";
import SvgSprite from "@/components/layout/SvgSprite";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WaDock from "@/components/layout/WaDock";
import SiteEffects from "@/components/layout/SiteEffects";
import ModalProvider from "@/components/modals/ModalProvider";

export const metadata: Metadata = {
  title: { default: "Jennete Rent | Sewa Mobil Jangka Panjang untuk Perusahaan di Jakarta", template: "%s" },
  description: "Sewa mobil dan motor untuk perusahaan, instansi, dan perorangan di Jakarta sejak 2010.",
  icons: { icon: "/assets/img/logo-mark.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* data-scroll-behavior: Next mematikan scroll halus CSS saat pindah halaman (halaman baru langsung di atas) */
    <html lang="id" data-theme="light" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="sr-only" href="#main">
          Lompat ke konten
        </a>
        <ModalProvider>
          <SvgSprite />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WaDock />
        </ModalProvider>
        <SiteEffects />
      </body>
    </html>
  );
}
