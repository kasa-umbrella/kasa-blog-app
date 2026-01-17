import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.isk01.sakurastorage.jp',
      },
    ],
  },
};

export default nextConfig;
