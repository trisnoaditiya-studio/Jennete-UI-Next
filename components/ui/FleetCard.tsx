import Link from "next/link";
import { Arrow } from "@/components/icons";
import { fullName, type Unit } from "@/lib/fleet";
import { QUOTE_URL, rp } from "@/lib/site";

/* Kartu unit (.vcard). Unit dengan halaman detail → tautan; tanpa detail → buka popup penawaran untuk unit itu.
   href memaksa tautan (mis. kartu "Unit serupa"); tags mengganti label default. */
export default function FleetCard({ u, tags, href }: { u: Unit; tags?: string[]; href?: string }) {
  const t = tags ?? [...(u.bb ? [u.bb] : []), u.kategori, ...(u.premium ? ["Premium"] : [])];
  const body = (cta: string) => (
    <>
      <div className="pic">
        {u.img ? (
          <img src={u.img} alt={fullName(u)} loading="lazy" />
        ) : (
          <>
            <svg className="car" role="img" aria-label={`Placeholder foto ${fullName(u)}`}>
              <use href={`#c-${u.icon}`} />
            </svg>
            <span className="cap">Foto menyusul</span>
          </>
        )}
      </div>
      <div className="vbody">
        <div className="tags">
          {t.map((x) => (
            <span className="tag" key={x}>
              {x}
            </span>
          ))}
        </div>
        <h3>{fullName(u)}</h3>
        <p className="desc">{u.desc}</p>
        <div className="vprice">
          <div>
            {u.price ? (
              <>
                <small>Mulai</small>
                <strong className="num">
                  {rp(u.price)}/{u.unit}
                </strong>
              </>
            ) : (
              <>
                <small>Harga</small>
                <strong className="num">Sesuai penawaran</strong>
              </>
            )}
          </div>
          <span className="link">
            {cta}
            <Arrow />
          </span>
        </div>
      </div>
    </>
  );
  const to = href ?? u.url;
  return to ? (
    <Link className="vcard" href={to}>
      {body("Lihat detail")}
    </Link>
  ) : (
    <a className="vcard" href={QUOTE_URL} data-open="quote" data-type={u.jenis} data-brand={u.brand} data-model={u.name} aria-haspopup="dialog">
      {body("Minta penawaran")}
    </a>
  );
}

