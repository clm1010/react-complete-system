/**
 * 通用API请求工具库
 * 封装fetch请求，统一处理配置和错误
 */

import type { SurveyData, ApiResponse } from '@/types/survey'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

/**
 * 通用请求器
 * @param endpoint API端点路径
 * @param options fetch配置选项
 * @returns 解析后的JSON数据
 */
// eslint-disable-next-line
export const fetcher = async <T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest' // 防止CSRF攻击
    },
    ...options
  })

  // 处理非200响应
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

// API方法集合
export const api = {
  surveys: {
    // 获取所有问卷
    getAll: () => fetcher<ApiResponse>('/api/surveys'),
    // 创建问卷
    create: (data: Omit<SurveyData, 'id' | 'createdAt'>) =>
      fetcher<ApiResponse>('/api/surveys', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    // 获取单个问卷
    get: (id: string) => fetcher<ApiResponse>(`/api/surveys/${id}`)
  }
}
