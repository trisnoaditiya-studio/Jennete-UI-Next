"use client";

import { useState } from "react";
import { QUOTE_URL, WA_URL } from "@/lib/site";

/* Kotak sewa di halaman detail: tab Harian / Kontrak perusahaan */
export default function BuyBox({ brand, model, price }: { brand: string; model: string; price: string }) {
  const [tab, setTab] = useState<"harian" | "kontrak">("harian");
  return (
    <>
      <div className="buy-seg" role="tablist" aria-label="Cara sewa">
        <button role="tab" aria-selected={tab === "harian"} aria-controls="p-harian" id="t-harian" onClick={() => setTab("harian")}>
          Harian
        </button>
        <button role="tab" aria-selected={tab === "kontrak"} aria-controls="p-kontrak" id="t-kontrak" onClick={() => setTab("kontrak")}>
          Kontrak perusahaan
        </button>
      </div>
      <div className="buy-panel" id="p-harian" role="tabpanel" aria-labelledby="t-harian" hidden={tab !== "harian"}>
        <p className="buy-price">
          <small>Mulai</small>
          <strong className="num">{price}</strong>
          <span>/hari</span>
        </p>
        <p className="buy-note">Untuk kebutuhan pribadi, acara, atau perjalanan singkat. Bisa dengan atau tanpa sopir.</p>
        <a className="btn btn-dark btn-block" href={WA_URL} data-open="resv" data-brand={brand} data-model={model} aria-haspopup="dialog">
          Reservasi via WhatsApp
        </a>
      </div>
      <div className="buy-panel" id="p-kontrak" role="tabpanel" aria-labelledby="t-kontrak" hidden={tab !== "kontrak"}>
        <p className="buy-price">
          <strong>Sesuai penawaran</strong>
        </p>
        <p className="buy-note">Kontrak bulanan hingga tahunan. Harga dihitung dari jumlah unit, durasi, dan layanan sopir.</p>
        <a className="btn btn-dark btn-block" href={QUOTE_URL} data-open="quote" data-brand={brand} data-model={model} aria-haspopup="dialog">
          Minta Penawaran
        </a>
      </div>
    </>
  );
}
