import axios from './ajax'
import type { ResDataType } from './ajax'

/**
 * @description 获取问卷统计列表
 * @param questionId 问卷id
 * @param opt 分页 { page: number; pageSize: number }
 */
export async function getQuestionStatListService(
	questionId: string,
	opt: { page: number; pageSize: number }
): Promise<ResDataType> {
	const url = `/api/stat/${questionId}`
	const data = (await axios.get(url, { params: opt })) as ResDataType
	return data
}

/**
 * @description 获取单个组件的统计数据
 * @param questionId 问卷id
 * @param componentId 组件id
 * @returns data 组件统计数据
 */
export async function getComponentStatService(questionId: string, componentId: string) {
	const url = `/api/stat/${questionId}/${componentId}`
	const data = (await axios.get(url)) as ResDataType
	return data
}
