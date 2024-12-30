import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb', // リクエストボディのサイズ制限
      allowedOrigins: ['http://localhost:3000'], // 許可されるオリジン
    },
  },
};

export default nextConfig;
