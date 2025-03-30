import { apiClient } from '@/lib/api'
import type { Question, QuestionFormData } from '@/types/question.d.ts'

/**
 * 获取所有问卷列表
 */
export const getAllQuestion = async () => {
  return apiClient<Question[]>('/question')
}

/**
 * 获取单个问卷详情
 * @param id 问卷ID
 */
export const getQuestion = async (id: number) => {
  return apiClient<Question>(`/question/${id}`)
}

/**
 * 创建新问卷
 * @param data 问卷表单数据
 */
export const createQuestion = async (data: QuestionFormData) => {
  return apiClient<Question>('/question', {
    method: 'POST',
    body: data
  })
}

/**
 * 更新问卷
 * @param id 问卷ID
 * @param data 更新数据
 */
export const updateQuestion = async (
  id: number,
  data: Partial<QuestionFormData>
) => {
  return apiClient<Question>(`/question/${id}`, {
    method: 'PUT',
    body: data
  })
}


/**
 * 创建新问卷
 * @param data 问卷表单数据
 */
export const postAnswer = async (data: any) => {
  return apiClient('/api/answer', {
    method: 'POST',
    body: data
  })
}