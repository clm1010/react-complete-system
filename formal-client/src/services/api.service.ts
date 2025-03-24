/**
 * 统一API请求服务
 * 封装所有后端接口调用逻辑
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface ApiConfig extends RequestInit {
  data?: unknown
  headers?: Record<string, string>
}

export class ApiService {
  static async request<T>(
    endpoint: string,
    config: ApiConfig = {}
  ): Promise<T> {
    const { data, headers, ...customConfig } = config

    const requestConfig: RequestInit = {
      method: customConfig.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...customConfig
    }

    if (data) {
      requestConfig.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, requestConfig)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'API请求失败')
      }

      return response.json()
    } catch (error) {
      console.error('API请求错误:', error)
      throw error
    }
  }

  // 问卷服务接口
  static survey = {
    create: (data: Question.CreatePayload) =>
      this.request<Question.ApiResponse>('/surveys', {
        method: 'POST',
        data
      }),

    get: (id: string) => this.request<Question.ApiResponse>(`/surveys/${id}`),

    list: () => this.request<Question.ApiResponse>('/surveys')
  }
}
