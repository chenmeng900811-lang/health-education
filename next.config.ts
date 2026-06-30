import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 开启纯静态导出模式
  images: {
    unoptimized: true, // 静态模式下必须关闭图片优化
  }
};

export default nextConfig;