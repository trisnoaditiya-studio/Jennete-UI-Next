import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Crumb from "@/components/ui/Crumb";
import PostCard from "@/components/ui/PostCard";
import QuoteButton from "@/components/ui/QuoteButton";
import { ARTICLES, fdate, getArticle, headingId, related, wordCount } from "@/lib/articles";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const title = `${a.title} | Jennete Rent`;
  return { title, description: a.excerpt, openGraph: { type: "article", title, description: a.excerpt } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const mins = Math.max(1, Math.round(wordCount(a) / 200));
  const toc = a.body.filter(([h]) => h);
  return (
    <>
      <article>
        <header className="ar-head">
          <div className="wrap">
            <Crumb dark linkLast items={[["Beranda", "/"], ["Artikel", "/artikel/"], [a.kategori, `/artikel/?kategori=${encodeURIComponent(a.kategori)}`]]} />
            <div className="ar-meta">
              <span className="ar-cat">{a.kategori}</span>
              <time dateTime={a.date}>{fdate(a.date)}</time>
              <span>Tim Jennete Rent</span>
              <span>{mins} menit baca</span>
              <span className="ar-draft">Draf, perlu ditinjau</span>
            </div>
            <h1 id="pg-title">{a.title}</h1>
            <p className="lead">{a.excerpt}</p>
          </div>
        </header>
        <div className="wrap">
          <figure className="ar-cover">
            <img src={a.img} alt="" fetchPriority="high" />
          </figure>
        </div>
        <section className="ar-body" aria-labelledby="pg-title">
          <div className="wrap ar-layout">
            {/* isi artikel = HTML dari data (seperti konten CMS) */}
            <div className="prose" dangerouslySetInnerHTML={{ __html: proseHtml(a.body) }} />
            <aside className="ar-aside">
              <nav className="ar-toc" aria-label="Daftar isi">
                <b>Daftar isi</b>
                <ol>
                  {toc.map(([h]) => (
                    <li key={h}>
                      <a href={`#${headingId(h)}`}>{h}</a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="ar-box">
                <b>Sewa kendaraan untuk perusahaan</b>
                <p>Servis, bengkel resmi, dan bantuan darurat 24/7 sudah termasuk.</p>
                <QuoteButton className="btn btn-white" />
              </div>
            </aside>
          </div>
        </section>
      </article>
      <section className="sec-soft" aria-labelledby="more-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2 id="more-title">Artikel lainnya</h2>
            </div>
            <Link className="btn btn-outline" href="/artikel/">
              Semua artikel
            </Link>
          </div>
          <div className="posts">
            {related(a).map((o) => (
              <PostCard a={o} key={o.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* judul bagian (h2 ber-id) + callout di tengah artikel: setelah bagian ke-3 bila bagian itu berjudul (sama dengan versi HTML) */
function proseHtml(body: [string, string][]) {
  const out: string[] = [];
  for (const [h, html] of body) {
    out.push(h ? `<h2 id="${headingId(h)}">${h}</h2>${html}` : html);
    if (h && out.length === 3)
      out.push(
        '<div class="ar-callout"><b>Butuh penawaran untuk perusahaan Anda?</b>Ceritakan jumlah unit, durasi, dan kebutuhan sopir. Tim kami menyiapkan penawaran resmi.<br><a class="btn btn-dark" href="/pesan/">Pesan kendaraan</a></div>',
      );
  }
  return out.join("");
}
