import { NextRequest, NextResponse } from 'next/server'



// 统一响应格式
const createResponse = <T>(data: T, status = 200): NextResponse => {
  return NextResponse.json({ success: true, data }, { status })
}

const errorResponse = (message: string, status = 400): NextResponse => {
  return NextResponse.json({ success: false, error: message }, { status })
}

// GET 获取所有问卷
// export async function GET() {
//   return createResponse(surveys)
// }

// POST 创建问卷
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log(data, 'data')
    console.log(request.body, 'request')
    return createResponse(data)
  } catch (error) {
    console.error('创建失败:', error)
    return errorResponse('创建失败')
  }
}
