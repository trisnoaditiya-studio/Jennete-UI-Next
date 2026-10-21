import type { Metadata } from "next";
import { Ic } from "@/components/icons";
import ThankYou from "@/components/forms/ThankYou";

export const metadata: Metadata = {
  title: "Terima Kasih | Jennete Rent",
  description: "Permintaan pemesanan kendaraan Jennete Rent.",
  robots: { index: false },
};

const STEPS = [
  ["chat", "Kami tinjau kebutuhan Anda", "Tim kami menghubungi Anda untuk memastikan unit, jumlah, dan jadwal."],
  ["doc", "Penawaran resmi", "Untuk perusahaan dan instansi, penawaran tertulis dikirim ke email Anda."],
  ["shield", "Verifikasi dokumen", "Pemeriksaan dokumen dan survei lokasi domisili oleh tim kami."],
  ["car", "Unit diantar", "Unit diantar ke alamat Anda dan masa sewa dimulai."],
];

export default function TerimaKasih() {
  return (
    <>
      <section className="ls-head ty" aria-labelledby="pg-title">
        <div className="wrap ty-in">
          <span className="ty-ok" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
          </span>
          <ThankYou />
        </div>
      </section>
      <section className="sec-soft" aria-labelledby="next-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="next-title">Langkah selanjutnya</h2>
              <p className="lead">Dari permintaan sampai unit diantar.</p>
            </div>
          </div>
          <ol className="ty-steps">
            {STEPS.map(([icon, b, s]) => (
              <li key={b}>
                <span className="ic">
                  <Ic name={icon} />
                </span>
                <div>
                  <b>{b}</b>
                  <small>{s}</small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
