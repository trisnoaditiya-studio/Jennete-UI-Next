import { Ic } from "@/components/icons";

const ITEMS = [
  ["shield", "Terdaftar di e-Katalog LKPP", "Siap untuk pengadaan instansi pemerintah", false],
  ["grid", "120+ merek mobil & motor", "Dari city car hingga kendaraan premium", true],
  ["clock", "Beroperasi sejak 2010", "Melayani perusahaan di Jakarta dan sekitarnya", true],
] as const;

/* Pita kredibilitas di bawah hero */
export default function Trust() {
  return (
    <section className="trust" aria-label="Kredibilitas Jennete Rent">
      <div className="wrap">
        <ul>
          {ITEMS.map(([icon, title, text, num]) => (
            <li key={title}>
              <span className="ic" aria-hidden="true">
                <Ic name={icon} />
              </span>
              <div>
                <strong className={num ? "num" : undefined}>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
