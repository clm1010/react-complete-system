import axios from './ajax'
import type { ResDataType } from './ajax'

type SearchOption = {
	keyword: string
	isStar: boolean
	isDeleted: boolean
	page: number
	pageSize: number
}

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

/**
 * @description 获取问卷列表
 * @method get
 * @param opt 查询参数
 * @param opt: Partial 表示满足一部分类型就可以
 * @returns 返回问卷列表data
 */
export async function getQuestionListService(
	opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
	const url = '/api/question'
	const data = (await axios.get(url, { params: opt })) as ResDataType
	return data
}

/**
 * @description 更新问卷
 * @param id  问卷id
 * @param opt 更新的数据
 * @returns 返回更新问卷的data
 */
export async function updateQuestionService(
	id: string,
	opt: { [key: string]: any }
): Promise<ResDataType> {
	const url = `/api/question/${id}`
	const data = (await axios.patch(url, opt)) as ResDataType
	return data
}

/**
 * @description 复制问卷
 * @param id 问卷id
 * @returns 返回复制问卷的data
 */
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
	const url = `/api/question//duplicate/${id}`
	const data = (await axios.post(url)) as ResDataType
	return data
}

/**
 * @description 批量彻底删除问卷
 * @param ids 问卷id数组
 * @returns 返回删除问卷的data
 */
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
	const url = `/api/question`
	const data = (await axios.delete(url, { data: { ids } })) as ResDataType
	return data
}
