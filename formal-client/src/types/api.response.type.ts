// 扩展API响应类型
// eslint-disable-next-line
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  statusCode?: number
}
