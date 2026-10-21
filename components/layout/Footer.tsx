import Link from "next/link";
import { ADDRESS, COMPANY, EMAIL, PHONE_1, PHONE_2 } from "@/lib/site";

const COLS: [string, [string, string][]][] = [
  [
    "Solusi Bisnis",
    [
      ["/solusi-bisnis/sewa-jangka-panjang/", "Sewa Jangka Panjang"],
      ["/solusi-bisnis/operasional-sopir/", "Operasional + Sopir"],
      ["/solusi-bisnis/pengadaan-instansi/", "Pengadaan Instansi"],
      ["/solusi-bisnis/layanan-purna-sewa/", "Layanan Purna Sewa"],
    ],
  ],
  [
    "Armada",
    [
      ["/armada/mobil/", "Mobil"],
      ["/armada/mobil/listrik/", "Mobil Listrik"],
      ["/armada/motor/", "Motor"],
      ["/pesan/", "Pesan Kendaraan"],
    ],
  ],
  [
    "Tentang Kami",
    [
      ["/tentang-kami/", "Profil & Legalitas"],
      ["/tentang-kami/#klien", "Klien"],
      ["/kontak/", "Kontak & Lokasi"],
    ],
  ],
  [
    "Bantuan",
    [
      ["/bantuan/#faq", "FAQ"],
      ["/bantuan/#cara-sewa", "Cara Sewa"],
      ["/syarat-ketentuan/", "Syarat & Ketentuan"],
      ["/kebijakan-privasi/", "Kebijakan Privasi"],
      ["/artikel/", "Artikel"],
    ],
  ],
];

export default function Footer() {
  return (
    <footer id="footer">
      <div className="wrap">
        <div className="foot">
          <div>
            <Link className="logo" href="/" aria-label="Jennete Rent, beranda">
              <span className="logo-badge">
                <img src="/assets/img/logo-mark.png" alt="" width={40} height={40} />
              </span>
              <span className="logo-word foot-word">
                Jennete <span>Rent</span>
              </span>
            </Link>
            <p className="foot-about">Sewa mobil dan motor untuk perusahaan, instansi, dan perorangan di Jakarta sejak 2010.</p>
            <p className="foot-addr">{ADDRESS}</p>
            <p>
              <a href={`tel:${PHONE_1.tel}`}>{PHONE_1.label}</a> / <a href={`tel:${PHONE_2.tel}`}>{PHONE_2.label}</a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
          {COLS.map(([title, links]) => (
            <div key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="legal">
          <span>© 2026 {COMPANY}. Jennete Rent terdaftar di e-Katalog LKPP.</span>
          <span>Kantor buka Senin–Jumat 08.00–18.00, Sabtu 08.00–15.00</span>
        </div>
      </div>
    </footer>
  );
}
