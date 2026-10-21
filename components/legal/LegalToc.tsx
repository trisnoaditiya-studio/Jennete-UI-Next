"use client";

import useScrollSpy from "@/components/ui/useScrollSpy";

/* Daftar isi halaman legal dengan penanda bagian yang sedang dibaca */
export default function LegalToc({ items }: { items: [string, string][] }) {
  const active = useScrollSpy(items.map(([id]) => id));
  return (
    <nav className="ar-toc lg-toc" aria-label="Daftar isi">
      <b>Daftar isi</b>
      <ol>
        {items.map(([id, title], i) => {
          const on = active === id;
          return (
            <li key={id}>
              <a href={`#${id}`} className={on ? "is-active" : undefined} aria-current={on ? "true" : undefined}>
                <span className="num">{i + 1}.</span>
                {title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
