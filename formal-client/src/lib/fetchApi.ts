/**
 * Fetches data from the backend API.
 * Prepends the base API URL from environment variables.
 * Handles basic error checking and JSON parsing.
 *
 * @param path The API endpoint path (e.g., '/questionnaires')
 * @param options Standard Fetch API options (method, headers, body, etc.)
 * @returns A promise that resolves with the JSON response data.
 * @throws An error if the fetch request fails or the response is not ok.
 */
export async function fetchApi<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiUrl = process.env.BACKEND_API_URL // 从环境变量获取后端 URL
  if (!apiUrl) {
    // 在服务器端操作（如 Server Actions, API Routes, Server Components）中，这个错误会被捕获
    // 在客户端，如果 BACKEND_API_URL 没有通过某种方式暴露，也会出错
    // 注意：默认情况下 .env 变量只在服务器端可用。
    // 如果需要在客户端使用，需要在 next.config.mjs 中通过 `publicRuntimeConfig` 或 `env` 暴露，
    // 或者最好是由 Server Actions/API Routes 处理 API 调用。
    // 在我们的例子中，fetchApi 主要被服务器端代码（Actions, API Routes）调用，所以这里没问题。
    console.error(
      'BACKEND_API_URL environment variable is not set or accessible.'
    )
    throw new Error('Backend API URL is not configured.')
  }

  const url = `${apiUrl}${path}` // 拼接完整 URL

  // Log API calls (仅在服务器端可见, 因为 .env 变量默认不在客户端暴露)
  console.log(`服务层获取 API: ${options.method || 'GET'} ${url}`)

  try {
    const response = await fetch(url, {
      cache: 'no-store', // 禁用缓存，确保获取最新数据，尤其是在 Server Actions/Components 中
      ...options,
      headers: {
        'Content-Type': 'application/json', // 默认发送 JSON
        ...options.headers // 允许覆盖或添加 headers
      }
    })

    // 检查响应状态码
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json() // 尝试解析错误响应体
      } catch (e) {
        console.error(`解析后端错误响应失败:`, e)
        // 如果响应体不是 JSON 或解析失败
        errorData = {
          message:
            response.statusText ||
            `请求失败，状态码: ${response.status}`
        }
      }
      console.error(
        `API Error from Backend (${response.status}) for ${url}:`,
        errorData
      )
      // 抛出包含后端信息的错误
      const error = new Error(
        errorData.message || `请求失败，状态码: ${response.status}`
      )
      // 可以附加状态码等信息到错误对象上，供上层处理
      ;(error as any).status = response.status
      ;(error as any).errorData = errorData
      throw error
    }

    // 处理 204 No Content 响应 (例如 DELETE 请求)
    if (response.status === 204) {
      return undefined as T // 返回 undefined
    }

    // 解析 JSON 响应体
    const data: T = await response.json()
    return data
  } catch (error) {
    // Log fetch 级别的错误 (如网络问题)
    console.error(
      `工作空间API失败 ${url}:`,
      error instanceof Error ? error.message : error
    )
    // 重新抛出错误，以便调用者可以处理
    if (error instanceof Error) {
      throw error // 抛出原始错误或包装后的错误
    } else {
      throw new Error('发生了未知的读取错误.')
    }
  }
}
