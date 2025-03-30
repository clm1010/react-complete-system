import { NextRequest, NextResponse } from 'next/server'
import { postAnswer } from '@/services/answer.services'


function genAnswerInfo(reqBody: any) {
  const answerList = [] as any
  Object.keys(reqBody).forEach(( key) => {
   if (key === 'questionId') return
    answerList.push({
      componentId: key,
      value: reqBody[key]
    })
  })
  return {
    questionId: reqBody.questionId || '',
    answerList
  }
}
/**
 * 统一处理响应格式
 */
const sendResponse = <T>(data: T, status = 200): NextResponse => {
  return NextResponse.json({ success: true, data }, { status })
}

const sendError = (message: string, status = 400): NextResponse => {
  return NextResponse.json({ success: false, error: message }, { status })
}


/**
 * GET 获取所有问卷
 */
export async function GET() {
  // return sendResponse(surveys)
}

/**
 * POST 创建问卷
 */
export async function POST(req: NextRequest) {
  try {

    const answerInfo = await genAnswerInfo(req.body)

  
    console.log(answerInfo, 'answerInfo1111')
    return sendResponse(answerInfo)
  } catch (error) {
    console.error(error)
    return sendError('创建问卷失败')
  }
}

/**
 * PUT 更新问卷
 */
// export async function PUT(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const id = searchParams.get('id')
//     const data: Partial<SurveyFormData> = await req.json()

//     if (!id) return sendError('缺少问卷ID')
    
//     const index = surveys.findIndex(s => s.id === id)
//     if (index === -1) return sendError('问卷不存在', 404)

//     // 更新数据验证
//     if (data.title?.trim() === '') return sendError('标题不能为空')
    
//     surveys[index] = { ...surveys[index], ...data }
//     return sendResponse(surveys[index])
//   } catch (error) {
//     return sendError('更新问卷失败')
//   }
// }