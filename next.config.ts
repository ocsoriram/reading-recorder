import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here 　試験的導入の設定項目が記述できる*/
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb', // リクエストボディのサイズ制限
      allowedOrigins: ['http://localhost:3000'], // 許可されるオリジン
    },
  },
  images: {
    domains: ['books.google.com'], // 許可する外部ドメイン
  },
};

export default nextConfig;
