// import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'

/**
 * @description 加载问卷数据 hook
 * @returns {loading: boolean, data: any, error: any}
 */
const useLoadQuestionData = () => {
	const { id = '' } = useParams() // 获取页面路径id

	// const [loading, setLoading] = useState(true) // loading
	// const [questionData, setQuestionData] = useState({}) // 问卷数据

	// useEffect(() => {
	// 	async function getQuestionData() {
	// 		const data = await getQuestionService(id)
	// 		setQuestionData(data)
	// 		setLoading(false)
	// 	}
	// 	getQuestionData()
	// }, [])

	// return { loading, questionData }

	// 使用 ahooks useRequest 加载数据
	const load = async () => {
		const data = await getQuestionService(id)
		return data
	}

	const { loading, data, error } = useRequest(load)
	return { loading, data, error }
}

export default useLoadQuestionData
