import Link from "next/link";
import { Arrow } from "@/components/icons";
import HomeHero from "@/components/home/HomeHero";
import SvcShowcase from "@/components/home/SvcShowcase";
import FleetRail from "@/components/home/FleetRail";
import Trust from "@/components/sections/Trust";
import HowSteps from "@/components/sections/HowSteps";
import FaqSection from "@/components/sections/FaqSection";
import PostCard from "@/components/ui/PostCard";
import { getArticle } from "@/lib/articles";
import { faqFor } from "@/lib/faqs";

const BLOG = ["sewa-atau-beli-mobil-operasional", "pengadaan-kendaraan-instansi-e-katalog", "mobil-listrik-kecil-untuk-perkotaan"];

export default function Home() {
  return (
    <>
      <HomeHero />
      <Trust />
      <SvcShowcase />
      <FleetRail />
      <HowSteps />
      <FaqSection title="Pertanyaan umum" lead="Belum menemukan jawabannya? Tim kami siap membantu lewat WhatsApp di jam kerja." items={faqFor("beranda")} />
      <section id="blog" aria-labelledby="blog-title">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="blog-title">Artikel terbaru</h2>
            <Link className="link" href="/artikel/">
              Lihat semua artikel
              <Arrow />
            </Link>
          </div>
          <div className="posts">
            {BLOG.map((s) => (
              <PostCard a={getArticle(s)!} excerpt key={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
