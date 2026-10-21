"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { WaIcon } from "@/components/brand-icons";
import { Ic } from "@/components/icons";
import FieldError from "@/components/ui/FieldError";
import { fullName, UNITS, unitSlug, type Jenis } from "@/lib/fleet";
import { errProps, mailOk, MSG, phoneOk, storeOrder, waUrl, type Errors } from "@/lib/forms";
import { ORDER_ENDPOINT, rp, WA_URL } from "@/lib/site";
import { useSearch } from "@/lib/client";

type Jalur = "perusahaan" | "perorangan";
const DURS = ["3", "6", "12", "18", "24", "36"];
const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5 9-10" />
  </svg>
);
const localNow = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};
const isPast = (x: string) => new Date(x).getTime() < Date.now() - 60000;
const fmtDT = (x: string) => (x ? new Date(x).toLocaleString("id-ID", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "");
const fmtM = (x: string) => (x ? new Date(x + "-01").toLocaleDateString("id-ID", { month: "long", year: "numeric" }) : "");

/* Formulir /pesan/: jalur perusahaan (penawaran) atau perorangan (reservasi), ringkasan langsung, kirim ke WhatsApp atau API.
   Prefill dari URL: ?jalur= &unit=slug | &jenis= &merek= &model= &jumlah= &durasi= &sopir=1 */
export default function OrderForm() {
  const router = useRouter();
  const [f, setF] = useState({
    jalur: "perusahaan" as Jalur,
    jenis: "mobil" as Jenis,
    brand: "",
    model: "",
    qty: "1",
    dur: "12",
    driver: false,
    city: "",
    month: "",
    addr: "",
    start: "",
    end: "",
    note: "",
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failWa, setFailWa] = useState<string | null>(null);
  const [minNow, setMinNow] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => {
    setF((o) => ({ ...o, [k]: v }));
    if (errors["o-" + k])
      setErrors((o) => {
        const rest = { ...o };
        delete rest["o-" + k];
        return rest;
      });
  };

  /* prefill dari URL, sekali setelah hidrasi (penyesuaian state saat render) */
  const search = useSearch();
  const [prefilled, setPrefilled] = useState(false);
  if (search !== null && !prefilled) {
    setPrefilled(true);
    const q = new URLSearchParams(search);
    const next = { ...f };
    if (q.get("jalur") === "perusahaan" || q.get("jalur") === "perorangan") next.jalur = q.get("jalur") as Jalur;
    let pre = q.get("unit") ? UNITS.find((c) => unitSlug(c) === q.get("unit")) : undefined;
    if (!pre && q.get("merek")) pre = UNITS.find((c) => c.brand === q.get("merek") && (!q.get("model") || c.name === q.get("model")));
    if (pre) {
      next.jenis = pre.jenis;
      next.brand = pre.brand;
      next.model = pre.name;
    } else if (q.get("merek")) {
      next.jenis = q.get("jenis") === "motor" ? "motor" : "mobil";
      next.brand = q.get("merek")!;
    } else if (q.get("jenis") === "motor" || q.get("jenis") === "mobil") next.jenis = q.get("jenis") as Jenis;
    if (q.get("jumlah")) next.qty = String(Math.min(500, Math.max(1, parseInt(q.get("jumlah")!) || 1)));
    if (q.get("durasi") && DURS.includes(q.get("durasi")!)) next.dur = q.get("durasi")!;
    if (q.get("sopir") === "1" && next.jenis === "mobil") next.driver = true;
    setF(next);
  }

  const pool = useMemo(() => UNITS.filter((c) => c.jenis === f.jenis), [f.jenis]);
  const brands = useMemo(() => [...new Set(pool.map((c) => c.brand))].sort(), [pool]);
  const models = pool.filter((c) => c.brand === f.brand);
  const unit = pool.find((c) => c.brand === f.brand && c.name === f.model);
  const isCo = f.jalur === "perusahaan";

  const lines: [string, string][] = [
    ["Jalur", isCo ? "Perusahaan / instansi" : "Perorangan / harian"],
    ["Jenis", f.jenis === "mobil" ? "Mobil" : "Motor"],
  ];
  if (isCo) {
    lines.push(["Jumlah unit", `${parseInt(f.qty) || 1} unit`], ["Durasi", `${f.dur} bulan`]);
    if (f.jenis === "mobil") lines.push(["Sopir", f.driver ? "Termasuk" : "Tanpa sopir"]);
    if (f.city.trim()) lines.push(["Lokasi", f.city.trim()]);
    if (f.month) lines.push(["Mulai", fmtM(f.month)]);
  } else {
    if (f.start) lines.push(["Jemput", fmtDT(f.start)]);
    if (f.end) lines.push(["Kembali", fmtDT(f.end)]);
  }

  const setJenis = (j: Jenis) => setF((o) => ({ ...o, jenis: j, brand: "", model: "", driver: j === "motor" ? false : o.driver }));
  const step = (d: number) => set("qty", String(Math.min(500, Math.max(1, (parseInt(f.qty) || 1) + d))));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFailWa(null);
    const v = (x: string) => x.trim();
    const er: Errors = {};
    if (f.brand && !f.model) er["o-model"] = 'Pilih model, atau pilih "Minta rekomendasi" di merek';
    if (isCo) {
      if (!((parseInt(f.qty) || 0) >= 1)) er["o-qty"] = "Minimal 1 unit";
      if (!v(f.company)) er["o-company"] = "Isi nama perusahaan atau instansi";
    } else {
      if (v(f.addr).length < 10) er["o-addr"] = "Isi alamat penjemputan lengkap";
      if (!f.start) er["o-start"] = "Pilih tanggal dan jam penjemputan";
      else if (isPast(f.start)) er["o-start"] = "Waktu penjemputan sudah lewat";
      if (!f.end) er["o-end"] = "Pilih tanggal dan jam pengembalian";
      else if (f.start && new Date(f.end) <= new Date(f.start)) er["o-end"] = "Harus setelah waktu penjemputan";
    }
    if (!v(f.name)) er["o-name"] = MSG.name;
    if (!v(f.phone)) er["o-phone"] = MSG.phoneEmpty;
    else if (!phoneOk(f.phone)) er["o-phone"] = MSG.phoneBad;
    const em = v(f.email);
    if (isCo && !em) er["o-email"] = MSG.emailEmpty;
    else if (em && !mailOk(em)) er["o-email"] = MSG.emailBad;
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) {
      const el = document.getElementById(first);
      el?.focus();
      el?.scrollIntoView({ block: "center" });
      return;
    }

    const veh = unit ? fullName(unit) : f.brand || "Minta rekomendasi";
    const data = {
      jalur: f.jalur,
      kendaraan: { jenis: f.jenis, merek: f.brand || null, model: f.model || null },
      kebutuhan: isCo
        ? { jumlah: parseInt(f.qty) || 1, durasi_bulan: +f.dur, sopir: f.jenis === "mobil" && f.driver, lokasi: v(f.city) || null, mulai: f.month || null }
        : { alamat: v(f.addr), jemput: f.start, kembali: f.end },
      catatan: v(f.note) || null,
      kontak: { nama: v(f.name), telepon: v(f.phone), email: em || null, perusahaan: isCo ? v(f.company) : null },
      sumber: window.location.href,
      dikirim: new Date().toISOString(),
    };
    const msg = [
      "Halo Jennete Rent, saya ingin " + (isCo ? "minta penawaran sewa." : "reservasi kendaraan."),
      "",
      "Nama: " + data.kontak.nama,
      ...(data.kontak.perusahaan ? ["Perusahaan: " + data.kontak.perusahaan] : []),
      "Telepon: " + data.kontak.telepon,
      ...(em ? ["Email: " + em] : []),
      "Kendaraan: " + veh,
      ...lines.slice(1).map(([a, b]) => a + ": " + b),
      ...(!isCo ? ["Alamat penjemputan: " + v(f.addr)] : []),
      ...(data.catatan ? ["Catatan: " + data.catatan] : []),
      "",
      "Terima kasih.",
    ].join("\n");
    const wa = waUrl(msg);
    const store = (mode: "wa" | "api") => storeOrder({ mode, jalur: f.jalur, kendaraan: veh, lines: lines.slice(1), email: em, wa });
    if (ORDER_ENDPOINT) {
      setSending(true);
      try {
        const r = await fetch(ORDER_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(String(r.status));
        store("api");
        router.push("/terima-kasih/");
      } catch {
        setSending(false);
        setFailWa(wa);
      }
    } else {
      store("wa");
      window.open(wa, "_blank", "noopener");
      router.push("/terima-kasih/");
    }
  };

  const ph = errProps;
  return (
    <form className="ps-form" id="orderForm" noValidate onSubmit={submit} ref={formRef}>
      <fieldset className="ps-paths">
        <legend className="sr-only">Jalur pemesanan</legend>
        {(
          [
            ["perusahaan", "building", "Perusahaan / instansi", "Kontrak bulanan hingga tahunan, penawaran resmi"],
            ["perorangan", "person", "Perorangan / harian", "Reservasi tanggal dan jam, dikonfirmasi via WhatsApp"],
          ] as const
        ).map(([val, icon, b, s]) => (
          <label className="ps-path" key={val}>
            <input type="radio" name="jalur" value={val} autoComplete="off" checked={f.jalur === val} onChange={() => set("jalur", val)} />
            <span className="ps-path-ic">
              <Ic name={icon} />
            </span>
            <span>
              <b>{b}</b>
              <small>{s}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="ps-grid">
        <div className="ps-steps">
          <section className="ps-step" aria-labelledby="st1">
            <h2 id="st1">
              <span className="ps-n" aria-hidden="true">
                1
              </span>
              Kendaraan
            </h2>
            <fieldset className="fm-field">
              <legend>Jenis</legend>
              <div className="fm-seg" role="radiogroup">
                {(["mobil", "motor"] as Jenis[]).map((j) => (
                  <label key={j}>
                    <input type="radio" name="jenis" value={j} autoComplete="off" checked={f.jenis === j} onChange={() => setJenis(j)} />
                    <span>{j === "mobil" ? "Mobil" : "Motor"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="fm-row">
              <div className="fm-field">
                <label htmlFor="o-brand">Merek</label>
                <select id="o-brand" name="merek" autoComplete="off" value={f.brand} onChange={(e) => setF((o) => ({ ...o, brand: e.target.value, model: "" }))}>
                  <option value="">Minta rekomendasi</option>
                  {brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="fm-field">
                <label htmlFor="o-model">Model</label>
                <select id="o-model" name="model" autoComplete="off" disabled={!models.length} value={f.model} onChange={(e) => set("model", e.target.value)} {...ph(errors, "o-model")}>
                  <option value="">{models.length ? "Pilih model" : "—"}</option>
                  {models.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
                <FieldError errors={errors} id="o-model" />
              </div>
            </div>
            <p className="fm-hint">
              Belum yakin unitnya? Pilih &quot;Minta rekomendasi&quot;, tim kami bantu memilihkan. <Link href="/armada/">Lihat armada</Link>
            </p>
          </section>

          <section className="ps-step" aria-labelledby="st2">
            <h2 id="st2">
              <span className="ps-n" aria-hidden="true">
                2
              </span>
              Kebutuhan
            </h2>
            <div data-for="perusahaan" hidden={!isCo}>
              <div className="fm-field">
                <label htmlFor="o-qty">Jumlah unit</label>
                <div className="fm-step">
                  <button type="button" aria-label="Kurangi unit" onClick={() => step(-1)}>
                    −
                  </button>
                  <input id="o-qty" name="jumlah" type="number" inputMode="numeric" min={1} max={500} autoComplete="off" value={f.qty} onChange={(e) => set("qty", e.target.value)} {...ph(errors, "o-qty")} />
                  <button type="button" aria-label="Tambah unit" onClick={() => step(1)}>
                    +
                  </button>
                </div>
                <FieldError errors={errors} id="o-qty" />
              </div>
              <fieldset className="fm-field">
                <legend>Durasi kontrak</legend>
                <div className="fm-chips fm-dur">
                  {DURS.map((d) => (
                    <label key={d}>
                      <input type="radio" name="dur" value={d} aria-label={`${d} bulan`} checked={f.dur === d} onChange={() => set("dur", d)} />
                      <span>
                        <b>{d}</b> bulan
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={`fm-toggle${f.jenis === "motor" ? " is-off" : ""}`} id="o-driver-wrap">
                <input type="checkbox" id="o-driver" name="sopir" autoComplete="off" disabled={f.jenis === "motor"} checked={f.driver} onChange={(e) => set("driver", e.target.checked)} />
                <span className="fm-switch" aria-hidden="true"></span>
                <span>
                  <b>Termasuk sopir</b>
                  <small>Sopir berpengalaman disediakan oleh Jennete Rent</small>
                </span>
              </label>
              <div className="fm-row">
                <div className="fm-field">
                  <label htmlFor="o-city">
                    Lokasi pengantaran <span className="fm-opt">(opsional)</span>
                  </label>
                  <input id="o-city" name="lokasi" placeholder="Jakarta Selatan" autoComplete="address-level2" value={f.city} onChange={(e) => set("city", e.target.value)} />
                </div>
                <div className="fm-field">
                  <label htmlFor="o-month">
                    Rencana mulai <span className="fm-opt">(opsional)</span>
                  </label>
                  <input id="o-month" name="mulai" type="month" value={f.month} onChange={(e) => set("month", e.target.value)} />
                </div>
              </div>
            </div>
            <div data-for="perorangan" hidden={isCo}>
              <div className="fm-field">
                <label htmlFor="o-addr">Alamat penjemputan</label>
                <textarea id="o-addr" name="alamat" rows={2} autoComplete="street-address" value={f.addr} onChange={(e) => set("addr", e.target.value)} {...ph(errors, "o-addr")} />
                <span className="fm-hint">Alamat lengkap tempat unit diserahkan kepada Anda</span>
                <FieldError errors={errors} id="o-addr" />
              </div>
              <div className="fm-row">
                <div className="fm-field">
                  <label htmlFor="o-start">Tanggal &amp; jam penjemputan</label>
                  <input id="o-start" name="jemput" type="datetime-local" min={minNow || undefined} onFocus={() => setMinNow(localNow())} value={f.start} onChange={(e) => set("start", e.target.value)} {...ph(errors, "o-start")} />
                  <FieldError errors={errors} id="o-start" />
                </div>
                <div className="fm-field">
                  <label htmlFor="o-end">Tanggal &amp; jam pengembalian</label>
                  <input id="o-end" name="kembali" type="datetime-local" min={f.start || minNow || undefined} onFocus={() => setMinNow(localNow())} value={f.end} onChange={(e) => set("end", e.target.value)} {...ph(errors, "o-end")} />
                  <FieldError errors={errors} id="o-end" />
                </div>
              </div>
            </div>
            <div className="fm-field">
              <label htmlFor="o-note">
                Catatan <span className="fm-opt">(opsional)</span>
              </label>
              <textarea id="o-note" name="catatan" rows={2} placeholder="Rute, jam operasional, atau kebutuhan khusus" value={f.note} onChange={(e) => set("note", e.target.value)} />
            </div>
          </section>

          <section className="ps-step" aria-labelledby="st3">
            <h2 id="st3">
              <span className="ps-n" aria-hidden="true">
                3
              </span>
              Kontak
            </h2>
            <div className="fm-row">
              <div className="fm-field">
                <label htmlFor="o-name">Nama</label>
                <input id="o-name" name="nama" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} {...ph(errors, "o-name")} />
                <FieldError errors={errors} id="o-name" />
              </div>
              <div className="fm-field">
                <label htmlFor="o-phone">Nomor telepon</label>
                <input id="o-phone" name="telepon" type="tel" inputMode="tel" autoComplete="tel" placeholder="0812 3456 7890" value={f.phone} onChange={(e) => set("phone", e.target.value)} {...ph(errors, "o-phone")} />
                <FieldError errors={errors} id="o-phone" />
              </div>
            </div>
            <div className="fm-row">
              <div className="fm-field">
                <label htmlFor="o-email">
                  Alamat email{" "}
                  <span className="fm-opt" data-for="perorangan" hidden={isCo}>
                    (opsional)
                  </span>
                </label>
                <input
                  id="o-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={isCo ? "nama@perusahaan.co.id" : "nama@email.com"}
                  value={f.email}
                  onChange={(e) => set("email", e.target.value)}
                  {...ph(errors, "o-email")}
                />
                <span className="fm-hint" data-for="perusahaan" hidden={!isCo}>
                  Penawaran resmi dikirim ke email ini
                </span>
                <FieldError errors={errors} id="o-email" />
              </div>
              <div className="fm-field" data-for="perusahaan" hidden={!isCo}>
                <label htmlFor="o-company">Nama perusahaan / instansi</label>
                <input id="o-company" name="perusahaan" autoComplete="organization" value={f.company} onChange={(e) => set("company", e.target.value)} {...ph(errors, "o-company")} />
                <FieldError errors={errors} id="o-company" />
              </div>
            </div>
          </section>
        </div>

        <aside className="ps-sum" aria-labelledby="sum-title">
          <div className="ps-sum-in">
            <h2 id="sum-title">Ringkasan</h2>
            <div className="ps-unit">
              <div className="pic">
                {unit?.img ? (
                  <img src={unit.img} alt="" />
                ) : (
                  <svg className="car" aria-hidden="true">
                    <use href={`#c-${unit ? unit.icon : f.jenis === "motor" ? "moto" : "mpv"}`} />
                  </svg>
                )}
              </div>
              <div>
                <b>{unit ? fullName(unit) : f.brand ? `${f.brand} (pilih model)` : "Unit belum dipilih"}</b>
                <small>{unit ? (unit.price ? `Mulai ${rp(unit.price)}/${unit.unit}` : "Harga sesuai penawaran") : "Tim kami bantu memilihkan"}</small>
              </div>
            </div>
            <dl className="ps-lines">
              {lines.map(([a, b]) => (
                <div key={a}>
                  <dt>{a}</dt>
                  <dd>{b}</dd>
                </div>
              ))}
            </dl>
            <ul className="ps-inc">
              <li>{CHECK}Servis berkala tiap 10.000 km atau 6 bulan</li>
              <li>{CHECK}Bengkel resmi ATPM di seluruh Indonesia</li>
              <li>{CHECK}Bantuan darurat 24/7</li>
            </ul>
            <p className="ps-err" role="alert" hidden={!failWa}>
              Permintaan belum terkirim. Coba lagi, atau{" "}
              <a href={failWa || "#"} target="_blank" rel="noopener">
                kirim lewat WhatsApp
              </a>
              .
            </p>
            <button className="btn btn-dark btn-block" type="submit" disabled={sending}>
              {sending ? "Mengirim…" : "Kirim permintaan"}
            </button>
            <a className="btn btn-outline btn-block" href={WA_URL} target="_blank" rel="noopener">
              <WaIcon />
              Tanya dulu lewat WhatsApp
            </a>
            <p className="ps-fine">Dengan mengirim, Anda setuju dihubungi tim Jennete Rent melalui telepon, WhatsApp, atau email terkait permintaan ini.</p>
          </div>
        </aside>
      </div>
    </form>
  );
}
