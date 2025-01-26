import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "one-market-phil.s3.us-east-1.amazonaws.com",
      "aimg.kwcdn.com",
      "img.kwcdn.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
