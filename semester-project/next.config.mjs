/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode: true,
    images: {
      domains: [
        "res.cloudinary.com",
        "picsum.photos",
        "via.placeholder.com",
        "unsplash.com",
        "source.unsplash.com",
      ],
      remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // Contentful’s CDN
      },
    ],
    },
  };
  
  export default nextConfig;

