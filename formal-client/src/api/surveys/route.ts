import { NextRequest, NextResponse } from 'next/server'
import { handleCors, corsHeaders } from '@/lib/cors'
import { surveyMockService } from '@/mocks/survey.mock'

// GET /api/surveys
export async function GET(req: NextRequest) {
  // 处理CORS预检请求
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const data = surveyMockService.getAll()
    return NextResponse.json(
      { success: true, data },
      { headers: corsHeaders(req) }
    )
  } catch (error) {
    console.error('获取数据失败:', error)
    return NextResponse.json(
      { success: false, error: '获取数据失败' },
      { status: 500, headers: corsHeaders(req) }
    )
  }
}

// POST /api/surveys
export async function POST(req: NextRequest) {
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const data = await req.json()
    const result = surveyMockService.create(data)
    return NextResponse.json(
      { success: true, data: result },
      { status: 201, headers: corsHeaders(req) }
    )
  } catch (error) {
    console.error('创建问卷失败:', error)
    return NextResponse.json(
      { success: false, error: '创建问卷失败' },
      { status: 400, headers: corsHeaders(req) }
    )
  }
}

// PUT /api/surveys/:id
export async function PUT(req: NextRequest) {
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const pathSegments = req.nextUrl.pathname.split('/')
    const id = pathSegments[pathSegments.length - 1]
    const updateData = await req.json()

    const updated = surveyMockService.update(id, updateData)
    if (!updated) {
      return NextResponse.json(
        { success: false, error: '未找到问卷' },
        { status: 404, headers: corsHeaders(req) }
      )
    }
    return NextResponse.json(
      { success: true, data: updated },
      { headers: corsHeaders(req) }
    )
  } catch (error) {
    console.error('更新失败:', error)
    return NextResponse.json(
      { success: false, error: '更新失败' },
      { status: 500, headers: corsHeaders(req) }
    )
  }
}

// OPTIONS /api/surveys
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    headers: corsHeaders(req)
  })
}
