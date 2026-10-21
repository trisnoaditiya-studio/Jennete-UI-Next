import Link from "next/link";

/* Breadcrumb. Item terakhir = halaman ini (tanpa tautan) kecuali linkLast. dark = varian untuk latar terang. */
export default function Crumb({ items, dark = false, linkLast = false }: { items: [string, string?][]; dark?: boolean; linkLast?: boolean }) {
  return (
    <nav className={`crumb${dark ? " dark" : ""}`} aria-label="Breadcrumb">
      <ol>
        {items.map(([label, href], i) =>
          i < items.length - 1 || linkLast ? (
            <li key={label}>
              <Link href={href || "/"}>{label}</Link>
            </li>
          ) : (
            <li key={label} aria-current="page">
              {label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
