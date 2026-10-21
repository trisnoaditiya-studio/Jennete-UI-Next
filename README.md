# Jennete Rent (Next.js)

Versi Next.js dari situs HTML di `../jennete`. Tampilan, isi, dan interaksi sama; markup sekarang berupa komponen React dan data terpisah dari tampilan.

- Next.js 16.4 (App Router) + React 19 + TypeScript
- **Static export**: `npm run build` menghasilkan HTML statis di folder `out/`, bisa di-hosting di server mana pun seperti situs HTML sebelumnya.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # hasil statis di out/
npm run lint
```

Pratinjau hasil build: `npx serve out` atau `cd out && python3 -m http.server 3200`.

## Deploy

Unggah **isi** folder `out/` ke root domain (mis. `public_html/`).
- URL memakai garis miring di akhir (`/armada/mobil/`), sama seperti situs HTML.
- Halaman 404: `out/404.html`. Untuk Apache/cPanel/Plesk sudah disertakan `out/.htaccess` (`ErrorDocument 404 /404.html`). Netlify/Vercel/GitHub Pages memakai `404.html` otomatis.
- Situs diasumsikan berada di root domain. Bila dipasang di subfolder, isi `basePath` di `next.config.ts`.

## Struktur

```
app/                     rute (satu folder = satu URL)
  layout.tsx             header, footer, popup, tombol WhatsApp untuk semua halaman
  page.tsx               beranda
  solusi-bisnis/         halaman utama + [slug] (4 sub-halaman dari lib/solutions.tsx)
  armada/…               5 halaman listing (konfigurasi di lib/armada.ts)
  wuling-cortez-darion/  detail unit
  artikel/               daftar + [slug] (isi di lib/articles.ts)
  pesan/ terima-kasih/ kontak/ bantuan/ tentang-kami/ syarat-ketentuan/ kebijakan-privasi/
  not-found.tsx          404
components/
  layout/                Header (mega menu, menu mobile), MegaFleet, Footer, SvgSprite, WaDock, SiteEffects
  modals/                ModalProvider, QuoteModal ("Minta penawaran"), ContactWidget (WhatsApp)
  sections/              blok halaman yang dipakai ulang: SbHero, Trust, HowSteps, FaqSection, CtaBand, Proof, IncList
  ui/                    FleetCard, PostCard, Crumb, QuoteButton, FieldError, useScrollSpy
  armada/ home/ help/ articles/ forms/ detail/ legal/   komponen khusus halaman
lib/                     DATA & konstanta (ubah isi situs di sini)
  site.ts                nomor WhatsApp/telepon, alamat, jam kantor, endpoint form
  fleet.ts               katalog armada (harga, foto, kategori)
  faqs.tsx  help.ts      pertanyaan umum + pengelompokan di /bantuan/
  articles.ts            artikel (DRAF)
  solutions.tsx          4 halaman Solusi Bisnis
  armada.ts              konfigurasi 5 halaman listing
  legal.ts               Syarat & Ketentuan, Kebijakan Privasi (DRAF)
  client.ts              hook nilai browser (URL, sessionStorage, media query) yang aman untuk static export
styles/style.css         SATU-SATUNYA file CSS (lihat aturan di bawah)
public/assets/img/       semua gambar
docs/integrasi-pesan.md  skema data form untuk backend
```

## Aturan

- **Semua CSS di `styles/style.css`.** Tidak memakai CSS Modules, `<style>`, atau atribut `style` di komponen. Posisi foto memakai kelas `.op-*` (`posClass()` di `SbHero`).
- Tombol apa pun dengan `data-open="quote"` atau `data-open="resv"` membuka popup (ditangani `ModalProvider`), juga dari server component. `data-brand` / `data-model` mengisi unit di form.
- Gambar memakai `<img>` biasa (`images.unoptimized`), karena static export tidak menyediakan optimasi gambar Next.

## Form

Default: pesan disusun dan dibuka di WhatsApp. Untuk mengirim ke backend sendiri, isi `NEXT_PUBLIC_ORDER_ENDPOINT` / `NEXT_PUBLIC_CONTACT_ENDPOINT` saat build. Skema JSON: `docs/integrasi-pesan.md`.

## Konten yang masih DRAF

Artikel, Syarat & Ketentuan, dan Kebijakan Privasi berlabel draf dan wajib ditinjau klien/legal. Bagian bertanda "Perlu dilengkapi" (`.ph-note`) belum punya data.
