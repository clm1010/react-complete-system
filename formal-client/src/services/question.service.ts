import { fetchApi } from '@/lib/fetchApi'
import type { ResDataType } from '@/types/question.d.ts'

const API_BASE_PATH = '/question'

/**
 * @description getQuestionById 获取问卷数据
 * @param id 问卷 ID
 * @returns Promise<ResDataType> 问卷数据
 */
export const getQuestionById = async (id: string): Promise<ResDataType> => {
  console.log(`Service: getQuestionById called with id: ${id}`)
  if (!id) {
    throw new Error('Question ID is required.')
  }
  try {
    const questionData = await fetchApi<ResDataType>(`${API_BASE_PATH}/${id}`, {
      method: 'GET'
    })
    return questionData
  } catch (error) {
    console.error(`Service Error in getQuestionById for id ${id}:`, error)
    throw error
  }
}


// 可以将所有服务函数聚合到一个对象导出，方便导入
const questionService = {
  getQuestionById
}

export default questionService