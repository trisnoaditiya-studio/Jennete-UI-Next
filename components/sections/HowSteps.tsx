import { Ic } from "@/components/icons";
import QuoteButton from "@/components/ui/QuoteButton";

const STEPS = [
  ["chat", "Konsultasi kebutuhan", "Ceritakan jumlah unit, jenis kendaraan, durasi, dan kebutuhan sopir."],
  ["doc", "Penawaran resmi", "Kami kirim penawaran tertulis yang bisa langsung Anda proses di internal."],
  ["shield", "Verifikasi dokumen", "Pemeriksaan dokumen perusahaan dan survei lokasi domisili oleh tim kami."],
  ["car", "Unit diantar", "Unit diantar ke alamat Anda dan kontrak mulai berjalan."],
];

/* "Cara sewa untuk perusahaan": 4 langkah, animasi garis saat terlihat (kelas .in-view dari SiteEffects) */
export default function HowSteps({ docsHref = "#faq" }: { docsHref?: string }) {
  return (
    <section className="how" id="cara-sewa" aria-labelledby="steps-title">
      <div className="wrap">
        <div className="how-head">
          <div>
            <span className="how-eyebrow">Untuk perusahaan &amp; instansi</span>
            <h2 id="steps-title">Cara sewa untuk perusahaan</h2>
          </div>
          <div className="how-side">
            <p className="lead">Dari konsultasi sampai unit diantar, satu tim yang mendampingi Anda di setiap langkah.</p>
            <div className="how-cta">
              <QuoteButton />
              <a className="btn btn-ghost-w" href={docsHref}>
                Lihat dokumen yang dibutuhkan
              </a>
            </div>
          </div>
        </div>
        <div className="how-track">
          <div className="how-line" aria-hidden="true">
            <span></span>
          </div>
          <ol className="how-steps">
            {STEPS.map(([icon, title, text], i) => (
              <li className="how-step" key={title}>
                <span className="how-node" aria-hidden="true">
                  <Ic name={icon} sw={1.7} />
                </span>{" "}
                <span className="how-num">Langkah 0{i + 1}</span> <h3>{title}</h3> <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
