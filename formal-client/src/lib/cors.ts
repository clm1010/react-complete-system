/**
 * CORS配置工具
 * 处理跨域请求验证和响应头设置
 */

import { NextRequest, NextResponse } from 'next/server'

/**
 * 生成CORS响应头
 * @param req 请求对象
 * @returns CORS相关headers
 */
export const corsHeaders = (req: NextRequest) => {
  const origin = req.headers.get('origin') || ''
  const allowedOrigins = process.env.NEXT_PUBLIC_CORS_ORIGIN?.split(',') || []

  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0], // 默认允许第一个源
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true'
  }
}

/**
 * 处理OPTIONS预检请求
 * @param req 请求对象
 * @returns 预检响应或undefined
 */
export const handleCors = (req: NextRequest) => {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders(req) })
  }
}
