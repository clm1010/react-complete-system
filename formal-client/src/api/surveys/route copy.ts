/**
 * 问卷API路由（代理后端服务）
 */
import { NextRequest, NextResponse } from 'next/server'
import { handleCors, corsHeaders } from '@/lib/cors'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const backendResponse = await fetch(`${process.env.BACKEND_API}/surveys`, {
      headers: { Authorization: req.headers.get('Authorization') || '' }
    })

    const data = await backendResponse.json()

    return new NextResponse(JSON.stringify(data), {
      headers: corsHeaders(req)
    })
  } catch (error) {
    console.error('获取数据失败:', error)
    return NextResponse.json(
      { success: false, error: '获取数据失败' },
      { status: 500, headers: corsHeaders(req) }
    )
  }
}

export async function POST(req: NextRequest) {
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const payload = await req.json()

    const backendResponse = await fetch(`${process.env.BACKEND_API}/surveys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.get('Authorization') || ''
      },
      body: JSON.stringify(payload)
    })

    const data = await backendResponse.json()

    return new NextResponse(JSON.stringify(data), {
      status: backendResponse.status,
      headers: corsHeaders(req)
    })
  } catch (error) {
    console.error('创建问卷失败:', error)
    return NextResponse.json(
      { success: false, error: '创建问卷失败' },
      { status: 500, headers: corsHeaders(req) }
    )
  }
}
