/**
 * 服务端表单操作
 * 处理问卷提交逻辑
 */

'use server'
import { revalidatePath } from 'next/cache'
import { surveyMockService } from '@/mocks/survey.mock'
import type { SurveyData } from '@/types/survey.d.ts'

/**
 * 提交问卷表单
 * @param _ 表单初始状态（未使用）
 * @param formData 表单数据
 * @returns 提交结果
 */
// eslint-disable-next-line
export const submitSurvey = async (_: any, formData: FormData) => {
  try {
    // 解析表单数据
    const data = {
      title: formData.get('title') as string,
      gender: formData.get('gender') as SurveyData['gender'],
      content: formData.get('content') as string
    }
    // 调用模拟服务
    const result = surveyMockService.create(data)
    console.log(result, 'result');
    // 刷新问卷列表页面
    revalidatePath('/survey')
    return { success: true, data: result }
  } catch (error) {
    console.error('提交失败:', error)
    return { success: false, error: '提交失败，请稍后重试' }
  }
}
