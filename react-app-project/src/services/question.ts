import axios from './ajax'
import type { ResDataType } from './ajax'

/**
 * @description 获取单个问卷
 * @method get
 * @param id 问卷id
 * @returns 返回单个问卷data
 */
export async function getQuestionService(id: string): Promise<ResDataType> {
	const url = `/api/question/${id}`
	const data = (await axios.get(url)) as ResDataType
	return data
}

/**
 * @description 创建问卷
 * @method post
 * @returns 返回创建问卷的data
 */
export async function createQuestionService(): Promise<ResDataType> {
	const url = '/api/question'
	const data = (await axios.post(url)) as ResDataType
	return data
}
