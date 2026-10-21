import Link from "next/link";
import { Arrow } from "@/components/icons";
import { fdate, type Article } from "@/lib/articles";

/* Kartu artikel. excerpt=true → ringkasan (blok blog beranda); default → judul + "Baca artikel". */
export default function PostCard({ a, excerpt = false, hidden, isNew, refEl }: { a: Article; excerpt?: boolean; hidden?: boolean; isNew?: boolean; refEl?: React.Ref<HTMLAnchorElement> }) {
  return (
    <Link className={`post${isNew ? " is-new" : ""}`} href={`/artikel/${a.slug}/`} data-kategori={a.kategori} hidden={hidden} ref={refEl}>
      <div className="pic">
        <img src={a.img} alt="" loading="lazy" />
      </div>
      <div className="ar-meta">
        <span className="ar-cat">{a.kategori}</span>
        <time dateTime={a.date}>{fdate(a.date)}</time>
      </div>
      <h3>{a.title}</h3>
      {excerpt ? (
        <p>{a.excerpt}</p>
      ) : (
        <span className="link">
          Baca artikel
          <Arrow />
        </span>
      )}
    </Link>
  );
}
