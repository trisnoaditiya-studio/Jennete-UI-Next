"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Arrow, Ic, Use } from "@/components/icons";
import { QUOTE_URL, EMERGENCY } from "@/lib/site";
import MegaFleet from "./MegaFleet";

type MegaId = "m-sol" | "m-fleet" | "m-help";

/* halaman tanpa hero gelap: header langsung solid (sama dengan body[data-header=light] di versi HTML) */
const LIGHT = ["/wuling-cortez-darion/", "/terima-kasih/", "/syarat-ketentuan/", "/kebijakan-privasi/"];
const isLight = (p: string) => LIGHT.includes(p) || /^\/artikel\/[^/]+\/$/.test(p);

const hoverMQ = () => typeof window !== "undefined" && window.matchMedia("(hover:hover) and (min-width:1101px)").matches;

export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState<MegaId | null>(null);
  const [drawer, setDrawer] = useState(false);
  const scrolled = useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb, { passive: true });
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY > 24,
    () => false,
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const light = isLight(pathname);

  const closeAll = useCallback(() => {
    setOpen(null);
    setDrawer(false);
  }, []);

  /* pindah halaman → tutup menu (penyesuaian state saat render, tanpa effect) */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setDrawer(false);
  }

  /* popup dibuka dari tombol mana pun → tutup menu */
  useEffect(() => {
    document.addEventListener("jr:closemenus", closeAll);
    return () => document.removeEventListener("jr:closemenus", closeAll);
  }, [closeAll]);

  /* klik di luar & Escape menutup mega menu */
  useEffect(() => {
    /* React (App Router) memasang event di document, jadi stopPropagation tidak menahan listener ini:
       klik di tombol panah submenu atau di dalam panel diabaikan secara eksplisit */
    const onDoc = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".sub-toggle, .mega")) return;
      setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen((cur) => {
        if (cur) document.querySelector<HTMLButtonElement>(`.sub-toggle[aria-controls="${cur}"]`)?.focus();
        return null;
      });
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* drawer mobile mengunci scroll halaman */
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    document.body.classList.toggle("menu-open", drawer);
  }, [drawer]);

  const show = (id: MegaId) => {
    if (!hoverMQ()) return;
    if (timer.current) clearTimeout(timer.current);
    setOpen(id);
  };
  const hide = (now = false) => {
    if (!hoverMQ()) return;
    if (timer.current) clearTimeout(timer.current);
    if (now) setOpen(null);
    else timer.current = setTimeout(() => setOpen(null), 180);
  };
  const toggle = (id: MegaId) => {
    if (hoverMQ() && open === id) return;
    setOpen(open === id ? null : id);
  };

  const current = (id: MegaId) =>
    (id === "m-sol" && pathname.startsWith("/solusi-bisnis")) || (id === "m-fleet" && pathname.startsWith("/armada")) || (id === "m-help" && pathname.startsWith("/bantuan"));

  const item = (id: MegaId, label: string, href: string, panel: ReactNode, extraClass: string) => (
    <li
      className="nav-item has-mega"
      onMouseEnter={() => show(id)}
      onMouseLeave={() => hide()}
      onFocus={() => show(id)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide(true);
      }}
    >
      <Link
        className={`nav-top${current(id) ? " is-current" : ""}`}
        aria-current={current(id) ? "page" : undefined}
        href={href}
        aria-haspopup="true"
        aria-expanded={open === id}
        aria-controls={id}
      >
        {label}
        <Use id="i-chev" />
      </Link>
      <button
        className="sub-toggle"
        type="button"
        aria-expanded={open === id}
        aria-controls={id}
        aria-label={`Buka submenu ${label}`}
        onClick={(e) => {
          e.stopPropagation();
          toggle(id);
        }}
      >
        <Use id="i-chev" />
      </button>
      <div className={`mega ${extraClass}${open === id ? " open" : ""}`} id={id} onClick={(e) => e.stopPropagation()}>
        {panel}
      </div>
    </li>
  );

  return (
    <header className={`site${scrolled || light ? " scrolled" : ""}${open || drawer ? " solid" : ""}`} id="top">
      <div className="wrap bar">
        <Link className="logo" href="/" aria-label="Jennete Rent, beranda">
          <span className="logo-badge">
            <img src="/assets/img/logo-mark.png" alt="" width={40} height={40} />
          </span>
          <span className="logo-word">
            Jennete <span>Rent</span>
          </span>
        </Link>
        <nav className={`main${drawer ? " drawer" : ""}`} id="mainnav" aria-label="Navigasi utama" onClickCapture={(e) => {
          if ((e.target as HTMLElement).closest("a")) closeAll();
        }}>
          <ul>
            <li className="nav-item">
              <Link href="/">Beranda</Link>
            </li>
            {item("m-sol", "Solusi Bisnis", "/solusi-bisnis/", <MegaSolusi />, "mega-sol")}
            {item("m-fleet", "Armada", "/armada/", <MegaFleet />, "mega-fleet")}
            <li className="nav-item">
              <Link href="/pesan/">Pesan Kendaraan</Link>
            </li>
            <li className="nav-item">
              <Link href="/tentang-kami/">Tentang Kami</Link>
            </li>
            {item("m-help", "Bantuan", "/bantuan/", <MegaHelp />, "mega-help")}
          </ul>
        </nav>
        <div className="bar-cta">
          <Link className="btn btn-outline" href="/armada/">
            Lihat Armada
          </Link>
          <a className="btn btn-dark" href={QUOTE_URL} data-open="quote" aria-haspopup="dialog">
            Minta Penawaran
          </a>
        </div>
        <button
          className="btn btn-outline burger"
          id="burger"
          aria-expanded={drawer}
          aria-controls="mainnav"
          onClick={(e) => {
            e.stopPropagation();
            setDrawer(!drawer);
          }}
        >
          {drawer ? "Tutup" : "Menu"}
        </button>
      </div>
    </header>
  );
}

const SOLUSI = [
  ["blogImg2", "Sewa jangka panjang", "Kontrak bulanan hingga tahunan untuk mobil dinas dan operasional.", "sewa-jangka-panjang"],
  ["heroImg1", "Kendaraan operasional + sopir", "Unit beserta sopir berpengalaman untuk kebutuhan harian kantor.", "operasional-sopir"],
  ["blogImg3", "Pengadaan instansi", "Terdaftar sebagai penyedia di e-Katalog LKPP untuk pengadaan pemerintah.", "pengadaan-instansi"],
  ["svcImg1", "Layanan purna sewa", "Servis berkala, jaringan bengkel resmi, dan bantuan darurat 24/7.", "layanan-purna-sewa"],
];

function MegaSolusi() {
  const pathname = usePathname();
  return (
    <div className="wrap mega-inner">
      {SOLUSI.map(([img, title, text, slug]) => {
        const here = pathname === `/solusi-bisnis/${slug}/`;
        return (
        <div className={`sol-col${here ? " is-here" : ""}`} key={slug}>
          <div className="sol-thumb">
            <img src={`/assets/img/site/${img}.jpg`} alt="" loading="lazy" />
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
          <Link className="link" href={`/solusi-bisnis/${slug}/`} aria-current={here ? "page" : undefined}>
            {here ? "Anda di sini" : "Pelajari"}
            <Arrow />
          </Link>
        </div>
        );
      })}
      <div className="mega-card bgcard sol">
        <h3>Butuh beberapa unit untuk perusahaan Anda?</h3>
        <p>Ceritakan jumlah unit, durasi, dan kebutuhan sopir. Tim kami menyiapkan penawaran resmi.</p>
        <a className="btn btn-dark" href={QUOTE_URL} data-open="quote" aria-haspopup="dialog">
          Minta Penawaran
        </a>
      </div>
    </div>
  );
}

const HELP: [string, [string, string, string, string][]][] = [
  [
    "Sebelum menyewa",
    [
      ["/bantuan/#faq", "help", "Pertanyaan umum (FAQ)", "Harga, durasi, dan layanan"],
      ["/bantuan/#cara-sewa", "steps", "Cara sewa untuk perusahaan", "Empat langkah sampai unit diantar"],
      ["/bantuan/#dokumen", "doc2", "Dokumen yang perlu disiapkan", "Perusahaan dan perorangan"],
    ],
  ],
  [
    "Selama menyewa",
    [
      ["/solusi-bisnis/layanan-purna-sewa/", "cal2", "Jadwal servis berkala", "Tiap 10.000 km atau 6 bulan"],
      ["/solusi-bisnis/layanan-purna-sewa/", "pin", "Jaringan bengkel resmi", "Bengkel ATPM di seluruh Indonesia"],
      ["/syarat-ketentuan/", "scale", "Syarat & Ketentuan", "Aturan sewa dan pembayaran"],
    ],
  ],
  [
    "Informasi",
    [
      ["/artikel/", "article", "Artikel", "Tips seputar sewa kendaraan"],
      ["/kontak/", "office", "Kontak & lokasi kantor", "Alamat, telepon, dan jam kerja"],
    ],
  ],
];

function MegaHelp() {
  return (
    <div className="wrap mega-inner">
      {HELP.map(([title, links]) => (
        <div key={title}>
          <h4>{title}</h4>
          <ul>
            {links.map(([href, icon, b, small]) => (
              <li key={b}>
                <Link className="hl" href={href}>
                  <span className="hl-ic" aria-hidden="true">
                    <Ic name={icon} sw={1.7} />
                  </span>
                  <span>
                    <b>{b}</b>
                    <small>{small}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mega-card bgcard sos">
        <span className="sos-ic" aria-hidden="true">
          <Ic name="phone" />
        </span>
        <span className="sos-live">
          <i aria-hidden="true"></i>Tersedia 24 jam, setiap hari
        </span>
        <h3>Bantuan darurat di jalan</h3>
        <p>Mogok atau kecelakaan, tim kami datang ke lokasi Anda.</p>
        <a className="btn btn-dark" href={`tel:${EMERGENCY.tel}`}>
          Telepon {EMERGENCY.label}
        </a>
      </div>
    </div>
  );
}
