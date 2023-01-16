/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.annihil.us"],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
