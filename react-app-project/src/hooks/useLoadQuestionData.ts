import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer/index'

/**
 * @description 加载问卷数据 hook
 * @returns {loading: boolean, data: any, error: any}
 */
const useLoadQuestionData = () => {
	const { id = '' } = useParams() // 获取页面路径id
	const dispatch = useDispatch()

	// ajax 加载数据
	const { data, error, loading, run } = useRequest(
		async (id: string) => {
			if (!id) throw new Error('没有问卷id')
			const data = await getQuestionService(id)
			return data
		},
		{
			manual: true
		}
	)

	// 根据获取的 data 设置 redux store
	useEffect(() => {
		if (!data) return

		const { title = '', componentList = [] } = data

		// 把 componentList 存储到 redux store 中
		dispatch(resetComponents({ componentList }))
	}, [data])

	// 判断id变化，执行 ajax 加载数据
	useEffect(() => {
		run(id)
	}, [id])

	return { loading, error }
}

export default useLoadQuestionData
