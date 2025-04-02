import { fetchApi } from '@/lib/fetchApi'
import type { AnswerType } from '@/types/question.d.ts'

const API_BASE_PATH = '/answer' // 定义此服务的基础路径

/**
 * @description 创建的问卷
 * @param data AnswerType 问卷的数据
 * @returns Promise<AnswerType> 创建成功后的问卷对象 (包含新 ID)
 */
export const postAnswer = async (data: AnswerType): Promise<AnswerType> => {
  console.log('Service: postAnswer called with data:', data)
  // 基本验证
  if (!data) {
    throw new Error('Title and Content are required to create a answer.')
  }
  try {
    const newAnswerData = await fetchApi<AnswerType>(API_BASE_PATH, {
      method: 'POST',
      body: JSON.stringify(data) // 将数据转换为 JSON 字符串
    })
    return newAnswerData
  } catch (error) {
    console.error('Service Error in postAnswer:', error)
    throw error
  }
}

// 可以将所有服务函数聚合到一个对象导出，方便导入
const answerService = {
  postAnswer
}

export default answerService
