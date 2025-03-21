import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "one-market-phil.s3.us-east-1.amazonaws.com",
      "aimg.kwcdn.com",
      "img.kwcdn.com",
      "img.freepik.com",
      "slicedinvoices.com",
      "getcash.ph",
      "dashboard.xendit.co",
      "upload.wikimedia.org",
      "static.wikia.nocookie.net",
      "logodix.com",
      "ph.phonebooky.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
