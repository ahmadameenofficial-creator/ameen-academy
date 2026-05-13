/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vz-*.b-cdn.net" },
      { protocol: "https", hostname: "*.bunnycdn.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "framer-motion"],
  },
};

export default nextConfig;
