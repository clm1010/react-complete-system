import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer/index'
import { resetPageInfo } from '../store/pageInfoReducer'

/**
 * @description 加载问卷数据 hook
 * @returns {loading: boolean, data: any, error: any}
 */

function useLoadQuestionData() {
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

		const { title = '', desc = '', js = '', css = '', componentList = [] } = data

		// 获取默认的 selectedId
		let selectedId = ''
		if (componentList.length > 0) {
			selectedId = componentList[0].fe_id // 默认选中第一个组件
		}

		// 把 componentList 存储到 redux store 中
		dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

		// 把 pageInfo 存储到 redux store 中
		dispatch(resetPageInfo({ title, desc, js, css }))
	}, [data])

	// 判断id变化，执行 ajax 加载数据
	useEffect(() => {
		run(id)
	}, [id])

	return { loading, error }
}

export default useLoadQuestionData
