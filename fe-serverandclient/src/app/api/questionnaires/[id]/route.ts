// app/api/questionnaires/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
// 引入服务层
import questionnaireService from '@/services/questionnaireService'
// 引入类型
import type { QuestionnaireUpdateData } from '@/types/questionnaire'

interface RouteParams {
  params: {
    id: string
  }
}

// GET Handler: 获取单个问卷
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params
  console.log(`API Route: GET /api/questionnaires/${id}`)
  try {
    // --- 调用 Service ---
    const questionnaire = await questionnaireService.getQuestionnaireById(id)
    // --- Service 调用结束 ---
    return NextResponse.json(questionnaire, { status: 200 })
  } catch (error: any) {
    console.error(`API Route GET /${id} Error:`, error)
    const status = (error as any).status || 500 // 获取状态码
    // 特别处理 404 (Not Found) 错误
    if (status === 404 || error.message.includes('not found')) {
      return NextResponse.json(
        { message: 'Questionnaire not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { message: error.message || 'Failed to fetch questionnaire' },
      { status }
    )
  }
}

// PUT Handler: 更新单个问卷
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params
  console.log(`API Route: PUT /api/questionnaires/${id}`)
  try {
    // 1. 解析请求体
    const body = await request.json()
    const updateData: QuestionnaireUpdateData = body // 获取需要更新的数据

    // 2. (可选) 快速验证
    if (updateData.title === undefined && updateData.content === undefined) {
      return NextResponse.json(
        { message: 'No fields provided for update' },
        { status: 400 }
      )
    }

    // 3. --- 调用 Service ---
    const updatedQuestionnaire = await questionnaireService.updateQuestionnaire(
      id,
      updateData
    )
    // --- Service 调用结束 ---

    return NextResponse.json(updatedQuestionnaire, { status: 200 }) // 返回更新后的资源
  } catch (error: any) {
    console.error(`API Route PUT /${id} Error:`, error)
    const status = (error as any).status || 500 // 获取状态码
    // 特别处理 404
    if (status === 404 || error.message.includes('not found')) {
      return NextResponse.json(
        { message: 'Questionnaire not found' },
        { status: 404 }
      )
    }
    // 其他错误
    return NextResponse.json(
      { message: error.message || 'Failed to update questionnaire' },
      { status }
    )
  }
}

// DELETE Handler (示例，也使用 Service)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = params
  console.log(`API Route: DELETE /api/questionnaires/${id}`)
  try {
    // --- 调用 Service ---
    await questionnaireService.deleteQuestionnaire(id)
    // --- Service 调用结束 ---
    return NextResponse.json(null, { status: 204 }) // 返回 204 No Content
  } catch (error: any) {
    console.error(`API Route DELETE /${id} Error:`, error)
    const status = (error as any).status || 500
    if (status === 404 || error.message.includes('not found')) {
      return NextResponse.json(
        { message: 'Questionnaire not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { message: error.message || 'Failed to delete questionnaire' },
      { status }
    )
  }
}
