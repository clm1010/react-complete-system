type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiConfig<T> {
  method?: HttpMethod
  body?: T
  headers?: HeadersInit
}
/**
 * 统一API请求客户端
 * @param endpoint API端点
 * @param config 请求配置
 * @returns Promise化的响应数据
 */
// export async function apiClient<T = any, U = any>(
export async function apiClient<T = unknown, U = unknown>(
  endpoint: string,
  config: ApiConfig<U> = { method: 'GET' }
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const url = `${baseUrl}${endpoint}`

  try {
    const response = await fetch(url, {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: config.body ? JSON.stringify(config.body) : undefined
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '请求失败')
    }

    return data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '未知错误')
  }
}

// 问卷API方法集合
export const questionApi = {
  /** 获取所有问卷 */
  // getSurveys: () => apiClient<Survey[]>('/surveys'),
  /** 获取单个问卷 */
  // getSurvey: (id: number) => apiClient<Survey>(`/surveys/${id}`),
  /** 创建问卷 */
  // createSurvey: (data: Omit<Survey, 'id' | 'createdAt'>) =>
  // apiClient<Survey>('/surveys', { method: 'POST', body: data }),
  /** 更新问卷 */
  // updateSurvey: (id: number, data: Partial<Survey>) =>
  // apiClient<Survey>(`/surveys/${id}`, { method: 'PUT', body: data })
}
