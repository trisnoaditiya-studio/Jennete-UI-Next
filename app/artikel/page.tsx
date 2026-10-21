import type { Metadata } from "next";
import Link from "next/link";
import ArticleList from "@/components/articles/ArticleList";
import CtaBand from "@/components/sections/CtaBand";
import SbHero from "@/components/sections/SbHero";
import { sortedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel | Jennete Rent",
  description: "Tips sewa kendaraan, informasi armada, dan panduan pengadaan untuk perusahaan dan instansi dari Jennete Rent.",
};

export default function Artikel() {
  return (
    <>
      <SbHero
        className="ar-hero"
        img="/assets/img/site/hero-artikel.webp"
        crumbs={[["Beranda", "/"], ["Artikel"]]}
        title="Artikel"
        sub="Tips sewa, informasi armada, dan panduan untuk perusahaan serta instansi."
      />
      <ArticleList articles={sortedArticles()} />
      <CtaBand
        title="Punya pertanyaan soal sewa kendaraan?"
        text="Tim kami siap membantu memilih unit dan menyiapkan penawaran resmi."
        secondary={
          <Link className="btn btn-ghost-w" href="/bantuan/">
            Lihat pertanyaan umum
          </Link>
        }
      />
    </>
  );
}
