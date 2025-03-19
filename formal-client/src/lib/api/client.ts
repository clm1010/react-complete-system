/**
 * 封装的 HTTP 客户端
 * 支持 GET/POST/PUT 方法，自动处理 JSON 转换和错误处理
 */

type RequestConfig = RequestInit & {
  params?: Record<string, string>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_BASE}`) {
    this.baseUrl = baseUrl
  }
  
  async request<T>(endpoint: string, config: RequestConfig): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    // 处理查询参数
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    // 合并配置
    const mergedConfig: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      ...config
    }

    try {
      const response = await fetch(url.toString(), mergedConfig)

      // 处理 HTTP 错误状态
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Request failed')
      }

      // 处理空响应
      if (response.status === 204) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  get<T>(endpoint: string, config?: Omit<RequestConfig, 'body'>) {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  post<T>(endpoint: string, body: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  put<T>(endpoint: string, body: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE)
