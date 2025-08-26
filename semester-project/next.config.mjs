import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //typescript: { ignoreBuildErrors: true },
  //eslint: { ignoreDuringBuilds: true },

  outputFileTracingRoot: __dirname,

  images: {
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


