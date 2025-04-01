// app/api/questionnaires/route.ts
import { NextRequest, NextResponse } from 'next/server'
// 引入服务层
import questionnaireService from '@/services/questionnaireService'
// 引入类型
import type { QuestionnaireCreateData } from '@/types/questionnaire'

// GET Handler: 获取所有问卷
export async function GET(request: NextRequest) {
  console.log('API Route: GET /api/questionnaires 66666')
  try {
    // --- 调用 Service ---
    const questionnaires = await questionnaireService.getQuestionnaires()
    // --- Service 调用结束 ---
    return NextResponse.json(questionnaires, { status: 200 })
  } catch (error: any) {
    console.error('API Route GET Error:', error)
    // 返回从 Service 传来的错误信息和状态码 (如果 fetchApi 设置了)
    const status = (error as any).status || 500
    return NextResponse.json(
      { message: error.message || 'Failed to fetch questionnaires' },
      { status }
    )
  }
}

// POST Handler: 创建新问卷
export async function POST(request: NextRequest) {
  console.log('API Route: POST /api/questionnaires')
  try {
    // 1. 解析请求体
    const body = await request.json()
    // 类型断言或验证输入数据结构
    const createData: QuestionnaireCreateData = body

    // 2. (可选) 在 API 路由层面也可以添加快速验证
    if (!createData.title || !createData.content) {
      return NextResponse.json(
        { message: 'Title and Content are required' },
        { status: 400 }
      )
    }

    // 3. --- 调用 Service ---
    const newQuestionnaire = await questionnaireService.createQuestionnaire(
      createData
    )
    // --- Service 调用结束 ---

    return NextResponse.json(newQuestionnaire, { status: 201 }) // 返回创建的资源和 201 状态码
  } catch (error: any) {
    console.error('API Route POST Error:', error)
    // 处理来自 Service 的错误 (例如验证错误或后端错误)
    const status = (error as any).status || 500 // 获取错误状态码，默认为 500
    // 检查是否是特定的可预知错误，如后端返回的 400
    if (status === 400 || error.message.includes('required')) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
    // 其他或未知错误
    return NextResponse.json(
      { message: error.message || 'Failed to create questionnaire' },
      { status }
    )
  }
}
