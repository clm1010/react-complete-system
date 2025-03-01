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
  }
}

export default nextConfig
