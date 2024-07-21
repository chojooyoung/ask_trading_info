/** @type {import('next').NextConfig} */
const nextConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;
