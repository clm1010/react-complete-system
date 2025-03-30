import { apiClient } from '@/lib/api'
import type { Survey, SurveyFormData } from '@/types/survey'

/**
 * 获取所有问卷列表
 */
export const getSurveys = async () => {
  return apiClient<Survey[]>('/surveys')
}

/**
 * 获取单个问卷详情
 * @param id 问卷ID
 */
export const getSurvey = async (id: number) => {
  return apiClient<Survey>(`/surveys/${id}`)
}

/**
 * 创建新问卷
 * @param data 问卷表单数据
 */
export const createSurvey = async (data: SurveyFormData) => {
  return apiClient<Survey>('/surveys', {
    method: 'POST',
    body: data
  })
}

/**
 * 更新问卷
 * @param id 问卷ID
 * @param data 更新数据
 */
export const updateSurvey = async (
  id: number,
  data: Partial<SurveyFormData>
) => {
  return apiClient<Survey>(`/surveys/${id}`, {
    method: 'PUT',
    body: data
  })
}
