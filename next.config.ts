import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  reactCompiler: true,
  images: {
    domains: ['i.insider.com']
  }
};

export default nextConfig;
