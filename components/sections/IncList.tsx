import Link from "next/link";
import { Arrow, Ic } from "@/components/icons";
import { EMERGENCY } from "@/lib/site";

/* "Sudah termasuk …": 3 layanan purna sewa */
export default function IncList({
  title,
  lead = "Layanan purna sewa yang sama untuk setiap unit Jennete Rent.",
  className,
  link = true,
}: {
  title: string;
  lead?: string;
  className?: string;
  link?: boolean;
}) {
  return (
    <section className={className} aria-labelledby="inc-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 id="inc-title">{title}</h2>
            <p className="lead">{lead}</p>
          </div>
          {link && (
            <Link className="link" href="/solusi-bisnis/layanan-purna-sewa/">
              Tentang layanan purna sewa
              <Arrow />
            </Link>
          )}
        </div>
        <ul className="inc-list">
          <li className="rv">
            <span className="trust-ic" aria-hidden="true">
              <Ic name="cal" />
            </span>
            <h3>Servis berkala terjadwal</h3>
            <p>Tiap 10.000 km atau 6 bulan, mana yang lebih dulu.</p>
          </li>
          <li className="rv">
            <span className="trust-ic" aria-hidden="true">
              <Ic name="pin" />
            </span>
            <h3>Bengkel resmi ATPM</h3>
            <p>Jaringan bengkel resmi merek terkait di seluruh Indonesia.</p>
          </li>
          <li className="rv">
            <span className="trust-ic" aria-hidden="true">
              <Ic name="phone" />
            </span>
            <h3>Bantuan darurat 24/7</h3>
            <p>
              Hubungi <a href={`tel:${EMERGENCY.tel}`}>{EMERGENCY.label}</a>, tim kami datang ke lokasi.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
