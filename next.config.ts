import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/gallery',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // 替换为你的图片域名
        port: '', // 如果有端口，可以在这里指定
        pathname: '/**', // 匹配所有路径
      },
    ],
  },
};

export default nextConfig;