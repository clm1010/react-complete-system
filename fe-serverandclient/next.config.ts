import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // 推荐开启 React 严格模式
  // 如果需要从外部域加载图像等，可以在此配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co'
        // port: '',
        // pathname: '',
        // search: ''
      }
    ]
  },
  // 环境变量可以在这里暴露给浏览器端，但不推荐用于敏感信息
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL
  }
}

export default nextConfig
