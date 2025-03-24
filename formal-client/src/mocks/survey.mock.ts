/**
 * 问卷模拟数据服务
 * 提供内存数据库操作，模拟真实API行为
 */

import { SurveyData } from '@/types/survey'

const surveys: SurveyData[] = []

export const surveyMockService = {
  // 获取所有问卷
  getAll: () => [...surveys],

  // 创建新问卷
  create: (data: Omit<SurveyData, 'id' | 'createdAt'>) => {
    const newSurvey = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    surveys.push(newSurvey)
    return newSurvey
  },

  // 更新现有问卷
  update: (id: string, updateData: Partial<SurveyData>) => {
    const index = surveys.findIndex((s) => s.id === id)
    if (index === -1) return null
    surveys[index] = { ...surveys[index], ...updateData }
    return surveys[index]
  }
}
