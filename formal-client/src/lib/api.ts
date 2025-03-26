type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiConfig<T> {
  method?: HttpMethod
  body?: T
  headers?: HeadersInit
}

/**
 * 统一封装的API请求方法
 * @param endpoint 请求端点
 * @param config 请求配置
 * @returns 解析后的JSON数据
 */
// export const apiClient = async <T = any, U = any>(
export const apiClient = async <T = unknown, U = unknown>(
  endpoint: string,
  config: ApiConfig<U> = { method: 'GET' }
): Promise<T> => {
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
