import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";

// 親フォルダの .env を読み込む
dotenv.config({ path: path.resolve(__dirname, "../.env") });

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
  // クライアントでも参照できるようにビルド時に注入
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
