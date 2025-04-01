// app/services/questionnaireService.ts
import { fetchApi } from '@/lib/fetchApi'
import type {
  Questionnaire,
  QuestionnaireCreateData,
  QuestionnaireUpdateData
} from '@/types/questionnaire' // 引入类型定义

const API_BASE_PATH = '/questionnaires' // 定义此服务的基础路径

/**
 * 获取所有问卷列表
 * @returns Promise<Questionnaire[]> 问卷数组
 */
export const getQuestionnaires = async (): Promise<Questionnaire[]> => {
  console.log('Service: getQuestionnaires called')
  try {
    // 调用底层 fetchApi 获取数据
    const questionnaires = await fetchApi<Questionnaire[]>(API_BASE_PATH, {
      method: 'GET'
      // GET 请求通常不需要 body
    })
    return questionnaires
  } catch (error) {
    console.error('Service Error in getQuestionnaires:', error)
    // 可以选择在这里处理特定错误或直接向上抛出
    throw error // 将错误传递给调用者 (Server Action, API Route, Component)
  }
}

/**
 * 根据 ID 获取单个问卷
 * @param id 问卷 ID
 * @returns Promise<Questionnaire> 单个问卷对象
 */
export const getQuestionnaireById = async (
  id: string
): Promise<Questionnaire> => {
  console.log(`Service: getQuestionnaireById called with id: ${id}`)
  if (!id) {
    throw new Error('Questionnaire ID is required.')
  }
  try {
    const questionnaire = await fetchApi<Questionnaire>(
      `${API_BASE_PATH}/${id}`,
      {
        method: 'GET'
      }
    )
    return questionnaire
  } catch (error) {
    console.error(`Service Error in getQuestionnaireById for id ${id}:`, error)
    throw error
  }
}

/**
 * 创建一个新的问卷
 * @param data 包含 title 和 content 的对象
 * @returns Promise<Questionnaire> 创建成功后的问卷对象 (包含新 ID)
 */
export const createQuestionnaire = async (
  data: QuestionnaireCreateData
): Promise<Questionnaire> => {
  console.log('Service: createQuestionnaire called with data:', data)
  // 基本验证
  if (!data || !data.title || !data.content) {
    throw new Error('Title and Content are required to create a questionnaire.')
  }
  try {
    const newQuestionnaire = await fetchApi<Questionnaire>(API_BASE_PATH, {
      method: 'POST',
      body: JSON.stringify(data) // 将数据转换为 JSON 字符串
    })
    return newQuestionnaire
  } catch (error) {
    console.error('Service Error in createQuestionnaire:', error)
    throw error
  }
}

/**
 * 更新指定 ID 的问卷
 * @param id 要更新的问卷 ID
 * @param data 包含要更新字段 (title, content) 的对象 (部分更新)
 * @returns Promise<Questionnaire> 更新成功后的问卷对象
 */
export const updateQuestionnaire = async (
  id: string,
  data: QuestionnaireUpdateData
): Promise<Questionnaire> => {
  console.log(
    `Service: updateQuestionnaire called for id: ${id} with data:`,
    data
  )
  if (!id) {
    throw new Error('Questionnaire ID is required for update.')
  }
  if (!data || (data.title === undefined && data.content === undefined)) {
    throw new Error(
      'At least one field (title or content) must be provided for update.'
    )
  }
  try {
    const updatedQuestionnaire = await fetchApi<Questionnaire>(
      `${API_BASE_PATH}/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data)
      }
    )
    return updatedQuestionnaire
  } catch (error) {
    console.error(`Service Error in updateQuestionnaire for id ${id}:`, error)
    throw error
  }
}

/**
 * 删除指定 ID 的问卷
 * @param id 要删除的问卷 ID
 * @returns Promise<void> 删除成功则无返回
 */
export const deleteQuestionnaire = async (id: string): Promise<void> => {
  console.log(`Service: deleteQuestionnaire called for id: ${id}`)
  if (!id) {
    throw new Error('Questionnaire ID is required for deletion.')
  }
  try {
    // fetchApi 在 204 No Content 时会返回 undefined
    await fetchApi<void>(`${API_BASE_PATH}/${id}`, {
      method: 'DELETE'
    })
    // 无需返回值
  } catch (error) {
    console.error(`Service Error in deleteQuestionnaire for id ${id}:`, error)
    throw error
  }
}

// 可以将所有服务函数聚合到一个对象导出，方便导入
const questionnaireService = {
  getQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire
}

export default questionnaireService
