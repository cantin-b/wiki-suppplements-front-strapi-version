import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    domains: [
      'localhost'
    ]
  }
};

export default nextConfig;
