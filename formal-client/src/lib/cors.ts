/**
 * CORS跨域处理工具
 */

import { NextRequest, NextResponse } from 'next/server'

/**
 * 生成CORS响应头
 * @param req 请求对象
 * @returns CORS相关headers
 */
export const corsHeaders = (req: NextRequest) => ({
  'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
})

export const handleCors = (req: NextRequest) => {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: corsHeaders(req)
    })
  }
}
