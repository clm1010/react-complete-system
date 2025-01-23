import type { FC } from 'react'
// import { useEffect, useState } from 'react'
import { useTitle } from 'ahooks'
// import { useSearchParams } from 'react-router-dom'
import { Typography, Spin } from 'antd'
// import { getQuestionListService } from '../../services/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import ListSearch from '../../components/ListSearch/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography

// const rawQuestionList = [
// 	{
// 		_id: 'q1',
// 		title: '问卷1',
// 		isPublished: false,
// 		isStar: true,
// 		answerCount: 5,
// 		createdAt: '5月10日 13:23'
// 	},
// 	{
// 		_id: 'q2',
// 		title: '问卷2',
// 		isPublished: true,
// 		isStar: true,
// 		answerCount: 5,
// 		createdAt: '5月11日 13:23'
// 	},
// 	{
// 		_id: 'q3',
// 		title: '问卷3',
// 		isPublished: false,
// 		isStar: true,
// 		answerCount: 5,
// 		createdAt: '5月12日 13:23'
// 	},
// 	{
// 		_id: 'q4',
// 		title: '问卷4',
// 		isPublished: true,
// 		isStar: false,
// 		answerCount: 5,
// 		createdAt: '5月13日 13:23'
// 	}
// ]

type questionListType = {
	_id: string
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const contentStyle: React.CSSProperties = {
	padding: 50,
	background: 'rgba(0, 0, 0, 0.05)',
	borderRadius: 4
}

const content = <div style={contentStyle} />

const List: FC = () => {
	useTitle('我的问卷 - 我的问卷')
	// const [searchParams] = useSearchParams()
	// console.log('keyword', searchParams.get('keyword'))

	// const [questionList, setQuestionList] = useState(rawQuestionList)

	// 使用 useEffect 获取数据
	// const [list, setList] = useState([])
	// const [total, setTotal] = useState(0)
	// useEffect(() => {
	// 	async function load() {
	// 		const data = await getQuestionListService()
	// 		const { list = [], total = 0 } = data
	// 		setList(list)
	// 		setTotal(total)
	// 	}
	// 	load()
	// }, [])

	// 使用自定义 hooks 获取数据
	const { loading, data = {} } = useLoadQuestionListData()
	const { list = [], total = 0 } = data

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<Spin tip="加载中..." size="large">
						{content}
					</Spin>
				)}
				{/* 问卷列表 */}
				{!loading &&
					list.length > 0 &&
					list.map((question: questionListType) => {
						const { _id } = question
						return (
							<QuestionCard
								key={_id}
								// {...question} 也可以这么写，解构
								_id={question._id}
								title={question.title}
								isPublished={question.isPublished}
								isStar={question.isStar}
								answerCount={question.answerCount}
								createdAt={question.createdAt}
							/>
						)
					})}
			</div>
			{!loading && list.length > 0 && (
				<div className={styles.footer}>{total}loadMore 上划加载更多...</div>
			)}
		</>
	)
}

export default List
