import type { NextConfig } from "next";

/* Static export: `next build` menghasilkan HTML statis di folder out/,
   bisa di-hosting di server mana pun seperti situs HTML sebelumnya. */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
