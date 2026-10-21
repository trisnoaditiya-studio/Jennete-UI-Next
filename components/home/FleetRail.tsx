"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow, Use } from "@/components/icons";
import FleetCard from "@/components/ui/FleetCard";
import { mobil, motor, type Jenis } from "@/lib/fleet";

/* unit dengan harga acuan (sama dengan rail versi HTML) */
const LIST: Record<Jenis, typeof mobil> = {
  mobil: mobil.filter((u) => !u.premium && u.price),
  motor,
};

/* "Armada pilihan" di beranda: tab Mobil/Motor + rail geser horizontal dengan tombol panah */
export default function FleetRail() {
  const [type, setType] = useState<Jenis>("mobil");
  const [edge, setEdge] = useState({ start: true, end: false });
  const rail = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const sync = useCallback(() => {
    const r = rail.current;
    if (!r) return;
    setEdge({ start: r.scrollLeft < 4, end: r.scrollLeft + r.clientWidth >= r.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    if (rail.current) rail.current.scrollLeft = 0;
    sync();
  }, [type, sync]);
  useEffect(() => {
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const step = () => {
    const r = rail.current;
    const c = r?.querySelector(".vcard");
    if (!r || !c) return 300;
    return c.getBoundingClientRect().width + (parseFloat(getComputedStyle(r).columnGap) || 16);
  };
  const types: Jenis[] = ["mobil", "motor"];

  return (
    <section className="fleet-sec" id="armada" aria-labelledby="fleet-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 id="fleet-title">Armada pilihan</h2>
            <p className="lead">Harga harian dan mingguan sebagai acuan. Harga kontrak bulanan dan tahunan dihitung sesuai jumlah unit dan durasi.</p>
          </div>
          <div className="seg" role="tablist" aria-label="Jenis kendaraan">
            {types.map((t, i) => (
              <button
                key={t}
                role="tab"
                aria-selected={type === t}
                aria-controls="rail"
                id={`tab-${t}`}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                onClick={() => setType(t)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  const k = (i + (e.key === "ArrowRight" ? 1 : -1) + types.length) % types.length;
                  tabs.current[k]?.focus();
                  setType(types[k]);
                }}
              >
                {t === "mobil" ? "Mobil" : "Motor"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="rail-wrap">
        <div className="rail" id="rail" role="tabpanel" aria-labelledby={`tab-${type}`} tabIndex={0} ref={rail} onScroll={() => requestAnimationFrame(sync)}>
          {LIST[type].map((u) => (
            <FleetCard u={u} key={u.id} tags={[u.bb, u.kategori]} href={u.url || "/armada/"} />
          ))}
          <Link className="vcard all" href={`/armada/${type}/`}>
            <span className="link">
              Lihat semua {type}
              <Arrow />
            </span>
          </Link>
        </div>
      </div>
      <div className="wrap">
        <div className="fleet-foot">
          <div className="rail-ctrl">
            <button type="button" aria-label="Kendaraan sebelumnya" disabled={edge.start} onClick={() => rail.current?.scrollBy({ left: -step(), behavior: "smooth" })}>
              <Use id="i-left" />
            </button>
            <button type="button" aria-label="Kendaraan berikutnya" disabled={edge.end} onClick={() => rail.current?.scrollBy({ left: step(), behavior: "smooth" })}>
              <Use id="i-right" />
            </button>
          </div>
          <Link className="btn btn-outline" href={`/armada/${type}/`}>
            <span>{type === "mobil" ? "Lihat semua mobil" : "Lihat semua motor"}</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
