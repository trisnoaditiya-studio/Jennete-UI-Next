"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, Use } from "@/components/icons";
import { fullName, listrik, mobil, motor, premium, type Unit } from "@/lib/fleet";
import { rp } from "@/lib/site";

const reguler = mobil.filter((u) => !u.premium);

/* kategori di mega menu Armada → 3 unit pratinjau + tautan "Lihat semua" */
const CATS: { key: string; units: Unit[]; href: string }[] = [
  { key: "MPV", units: [...reguler.filter((u) => u.kategori === "MPV"), ...premium.slice(0, 3)], href: "/armada/mobil/?kategori=MPV" },
  { key: "Premium", units: premium, href: "/armada/mobil/premium/" },
  { key: "SUV", units: reguler.filter((u) => u.kategori === "SUV"), href: "/armada/mobil/?kategori=SUV" },
  { key: "City Car", units: reguler.filter((u) => u.kategori === "City Car"), href: "/armada/mobil/?kategori=City%20Car" },
  { key: "Mobil listrik", units: listrik, href: "/armada/mobil/listrik/" },
  { key: "Motor", units: motor, href: "/armada/motor/" },
];

export default function MegaFleet() {
  const [cur, setCur] = useState(0);
  const cat = CATS[cur];
  return (
    <div className="wrap mega-inner">
      <div className="fleet-cats" role="tablist" aria-label="Kategori armada" id="megaCats">
        {CATS.map((c, i) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={i === cur}
            onClick={() => setCur(i)}
            onMouseEnter={() => setCur(i)}
            onFocus={() => setCur(i)}
          >
            {c.key}
            <Use id="i-right" />
          </button>
        ))}
      </div>
      <div className="fleet-preview" id="megaPreview" role="tabpanel">
        {cat.units.slice(0, 3).map((u) => (
          <Link className="prev-tile" href={u.url || "/armada/"} key={u.id}>
            <div className="pic">
              {u.img ? (
                <img src={u.img} alt="" />
              ) : (
                <Use id={`c-${u.icon}`} className="car" />
              )}
            </div>
            <strong>{fullName(u)}</strong>
            <span>{u.price ? `Mulai ${rp(u.price)}/${u.unit}` : "Harga sesuai penawaran"}</span>
          </Link>
        ))}
        <Link className="prev-tile all" href={cat.href}>
          <div className="pic">
            <span className="link">
              Lihat semua {cat.key}
              <Arrow />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
