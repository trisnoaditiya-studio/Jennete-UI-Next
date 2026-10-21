"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSessionItem } from "@/lib/client";
import { WaIcon } from "@/components/brand-icons";
import type { OrderSummary } from "@/lib/forms";

/* Isi /terima-kasih/ sesuai ringkasan yang disimpan form (sessionStorage "jr-order") */
export default function ThankYou() {
  const raw = useSessionItem("jr-order");
  const o = useMemo<OrderSummary | null>(() => {
    try {
      return JSON.parse(raw || "null");
    } catch {
      return null;
    }
  }, [raw]);

  let title = "Terima kasih";
  let lead = "Kami siap membantu kebutuhan kendaraan Anda.";
  if (o?.jalur === "kontak" && o.mode === "api") {
    title = "Pesan Anda sudah kami terima";
    lead = "Tim kami membalas melalui kontak yang Anda isi pada jam kantor.";
  } else if (o?.mode === "api") {
    title = "Permintaan Anda sudah kami terima";
    lead =
      o.jalur === "perusahaan" && o.email
        ? `Tim kami menindaklanjuti melalui kontak yang Anda isi. Penawaran resmi dikirim ke ${o.email}.`
        : "Tim kami menindaklanjuti melalui kontak yang Anda isi.";
  } else if (o) {
    title = "Satu langkah lagi: kirim pesan di WhatsApp";
    lead = "Pesan berisi permintaan Anda sudah kami siapkan. Tekan Kirim di WhatsApp agar tim kami menerimanya.";
  }

  return (
    <>
      <h1 id="pg-title">{title}</h1>
      <p className="lead">{lead}</p>
      <div className="ty-sum" hidden={!o}>
        {o && (
          <>
            <b>{o.kendaraan}</b>
            {(o.lines || []).map(([a, b]) => (
              <span key={a}>
                {a}: {b}
              </span>
            ))}
          </>
        )}
      </div>
      <div className="ty-cta">
        <a className="btn btn-wa" href={o?.wa || "https://wa.me/628881111508"} target="_blank" rel="noopener" hidden={!o || o.mode !== "wa"}>
          <WaIcon />
          Buka WhatsApp
        </a>
        <Link className="btn btn-outline" href="/armada/">
          Lihat armada lain
        </Link>
        <Link className="btn btn-outline" href="/">
          Kembali ke beranda
        </Link>
      </div>
    </>
  );
}
