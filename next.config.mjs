/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  },
  images: {
    domains: ["mathmozocms.test", "www.admin.osakamasjid.org","admin.osakamasjid.org","osakamasjid.org"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://admin.osakamasjid.org/api/v1/:path*",
      },
    ];
  },
  reactStrictMode: false,
};


export default nextConfig;

