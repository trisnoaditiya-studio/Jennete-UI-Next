import Link from "next/link";
import { Arrow, Ic } from "@/components/icons";

const COLLECTIONS: [string, string, string, string][] = [
  ["/armada/mobil/listrik/", "Mobil listrik", "Unit listrik dan PHEV untuk operasional perusahaan.", "fleet/6"],
  ["/armada/mobil/premium/", "Mobil premium", "MPV dan sedan premium untuk direksi dan tamu VIP.", "fleet/x-alphard"],
  ["/armada/motor/", "Motor", "Matic dan bebek, sewa mingguan dan bulanan.", "fleet/m-aerox"],
];

/* "Jelajahi koleksi": tautan ke koleksi lain (tanpa halaman ini) */
export function Collections({ skip }: { skip?: string }) {
  return (
    <section aria-labelledby="col-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 id="col-title">Jelajahi koleksi</h2>
            <p className="lead">Pilihan unit yang dikelompokkan sesuai kebutuhan.</p>
          </div>
        </div>
        <div className="sol-other">
          {COLLECTIONS.filter(([h]) => h !== skip).map(([h, t, d, img]) => (
            <Link className="sol-col rv" href={h} key={h}>
              <div className="sol-thumb">
                <img src={`/assets/img/${img}.jpg`} alt="" loading="lazy" />
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="link">
                Lihat koleksi
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export type StripPromo = { img: string; title: string; text: string; href: string; label: string };

/* pita 4 keunggulan + kartu gelap cross-sell */
export function Strip({ tiles, promo }: { tiles: [string, string, string][]; promo: StripPromo }) {
  return (
    <section className="hl-strip" aria-label="Keunggulan">
      <div className="wrap">
        <ul className="hl-tiles">
          {tiles.map(([icon, a, b]) => (
            <li key={a}>
              <span className="hl-ic" aria-hidden="true">
                <Ic name={icon} sw={1.7} />
              </span>
              <b>{a}</b>
              <small>{b}</small>
            </li>
          ))}
        </ul>
        <Link className="hl-promo" href={promo.href}>
          <div className="pic">
            <img src={`/assets/img/${promo.img}`} alt="" loading="lazy" />
          </div>
          <div>
            <b>{promo.title}</b>
            <p>{promo.text}</p>
          </div>
          <span className="btn btn-white hl-cta">
            {promo.label}
            <Arrow />
          </span>
        </Link>
      </div>
    </section>
  );
}
