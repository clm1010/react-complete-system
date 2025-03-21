import { NextRequest, NextResponse } from 'next/server'
import { handleCors, corsHeaders } from '@/lib/cors'
import { surveyMockService } from '@/mocks/survey.mock'

export async function GET(req: NextRequest) {
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const data = surveyMockService.getAll()
    return NextResponse.json(
      { success: true, data },
      { headers: corsHeaders(req) }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 500, headers: corsHeaders(req) }
    )
  }
}

export async function POST(req: NextRequest) {
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const data = await req.json()
    const result = surveyMockService.create(data)
    // const result = { id: '1' }
    return NextResponse.json(
      { success: true, data: result },
      { status: 201, headers: corsHeaders(req) }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 400, headers: corsHeaders(req) }
    )
  }
}
