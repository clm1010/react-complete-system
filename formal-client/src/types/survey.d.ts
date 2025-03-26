// 问卷基础类型
export interface Survey {
  id: number
  title: string
  content: string
  gender: 'male' | 'female'
  createdAt: string
}

// 表单数据类型（排除自动生成字段）
export type SurveyFormData = Omit<Survey, 'id' | 'createdAt'>

// 表单状态类型
export interface FormState {
  error?: string | null
  success?: boolean
}