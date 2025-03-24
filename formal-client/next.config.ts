import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // 严格模式 true 开启 false 关闭，当关闭后开发阶段不会出现两次打印
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
  // 配置环境变量白名单
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_CORS_ORIGIN: process.env.NEXT_PUBLIC_CORS_ORIGIN
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' }
        ]
      }
    ]
  }
}

export default nextConfig
