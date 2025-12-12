import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['i.insider.com']
  }
};

export default nextConfig;
