/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  },
  images: {
    remotePatterns: [
      // local/test host (no protocol -> allow http/https)
      { hostname: "mathmozocms.test" },

      // production/admin hosts (https)
      { protocol: "https", hostname: "www.admin.osakamasjid.org" },
      { protocol: "https", hostname: "admin.osakamasjid.org" },
      { protocol: "https", hostname: "osakamasjid.org" }
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://admin.osakamasjid.org/api/v1/:path*",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
