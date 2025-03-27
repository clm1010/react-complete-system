import { NextRequest, NextResponse } from 'next/server'

// // 统一响应格式
// const createResponse = <T>(data: T, status = 200): NextResponse => {
//   return NextResponse.json({ success: true, data }, { status })
// }

const errorResponse = (message: string, status = 400): NextResponse => {
  return NextResponse.json({ success: false, error: message }, { status })
}

// GET 获取所有问卷
export async function GET() {
  try {
    // const surveys = await getSurveysService()
    const data = [{ name: 'test' }]
    console.log('123123123123', data);
    return NextResponse.json({ success: true, data: data }, { status: 200 })
  } catch (error) {
    console.error('获取数据失败:', error)
    return NextResponse.json(
      { success: false, error: '获取数据失败' },
      { status: 500 }
    )
  }
}

// POST 创建问卷
export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    // const newSurvey = await createSurveyService(data)
    const newData = data
    return NextResponse.json({ success: true, data: newData }, { status: 201 })
  } catch (error) {
    console.error('创建失败:', error)
    return errorResponse('创建失败')
  }
}

// PUT 更新问卷
// export async function PUT(req: NextRequest) {
  // try {
    // const { searchParams } = new URL(req.url)
    // const id = searchParams.get('id')
    // const data = await req.json()

    // if (!id) throw new Error('缺少问卷ID')

    // const updatedSurvey = await updateSurveyService(Number(id), data)
    // return NextResponse.json({ success: true, data: updatedSurvey })
  // } catch (error) {
  //   console.error('更新失败:', error)
  //   return errorResponse('更新失败')
    // return NextResponse.json(
    //   { success: false, error: error.message },
    //   { status: 400 }
    // )
  // }
// }

// GET 获取所有问卷
// export async function GET() {
//   return createResponse(surveys)
// }

// // POST 创建问卷
// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.json()
//     console.log(data, 'data')
//     console.log(request.body, 'request')
//     return createResponse(data)
//   } catch (error) {
//     console.error('创建失败:', error)
//     return errorResponse('创建失败')
//   }
// }
