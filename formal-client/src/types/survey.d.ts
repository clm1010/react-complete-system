/** 类型定义 */



/**
 * @description API 响应格式
 */
// eslint-disable-next-line
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}

/**
 * @description 基础问卷数据类型
 */
export interface SurveyData {
  id: string
  title: string
  gender: 'male' | 'female' | 'other'
  content: string
  createdAt: Date
}
