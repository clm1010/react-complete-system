import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse } from '@/types/api.response.type'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_CORS_ORIGIN || '*'
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    return NextResponse.json(
      { success: true, data },
      { headers: DEFAULT_HEADERS }
    )
  } catch (error) {
    return handleApiError(error)
  }
}

function handleApiError(error: unknown) {
  console.error('API Error:', error)
  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    } satisfies ApiResponse,
    { status: 500, headers: DEFAULT_HEADERS }
  )
}
