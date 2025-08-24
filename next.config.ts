import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production deployment
  output: 'standalone',
  // Disable image optimization during development
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Improve performance with React strict mode
  reactStrictMode: true,
};

export default nextConfig;
