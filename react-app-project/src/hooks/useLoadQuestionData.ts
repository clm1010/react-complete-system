import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getQuestionService } from '../services/question'

const useLoadQuestionData = () => {
	const { id = '' } = useParams() // 获取问卷id
	const [loading, setLoading] = useState(true) // loading
	const [questionData, setQuestionData] = useState({}) // 问卷数据

	useEffect(() => {
		async function getQuestionData() {
			const data = await getQuestionService(id)
			setQuestionData(data)
			setLoading(false)
		}
		getQuestionData()
	}, [])

	return { loading, questionData }
}

export default useLoadQuestionData
