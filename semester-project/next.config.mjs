// next.config.mjs
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Helps Vercel/Next find the correct project root for output tracing
  outputFileTracingRoot: __dirname,

  images: {
    // Prefer remotePatterns over domains for flexibility
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" }, // Contentful
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;


