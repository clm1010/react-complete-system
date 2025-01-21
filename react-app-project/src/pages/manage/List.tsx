import type { FC } from 'react'
import { useState } from 'react'
import { useTitle } from 'ahooks'
// import { useSearchParams } from 'react-router-dom'
import { Typography } from 'antd'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import ListSearch from '../../components/ListSearch/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography

const rawQuestionList = [
	{
		_id: 'q1',
		title: '问卷1',
		isPublished: false,
		isStar: true,
		answerCount: 5,
		createdAt: '5月10日 13:23'
	},
	{
		_id: 'q2',
		title: '问卷2',
		isPublished: true,
		isStar: true,
		answerCount: 5,
		createdAt: '5月11日 13:23'
	},
	{
		_id: 'q3',
		title: '问卷3',
		isPublished: false,
		isStar: true,
		answerCount: 5,
		createdAt: '5月12日 13:23'
	},
	{
		_id: 'q4',
		title: '问卷4',
		isPublished: true,
		isStar: false,
		answerCount: 5,
		createdAt: '5月13日 13:23'
	}
]

const List: FC = () => {
	useTitle('我的问卷 - 我的问卷')
	// const [searchParams] = useSearchParams()
	// console.log('keyword', searchParams.get('keyword'))

	const [questionList, setQuestionList] = useState(rawQuestionList)

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
				{questionList.length > 0 &&
					questionList.map((question) => {
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
			<div className={styles.footer}>loadMore 上划加载更多...</div>
		</>
	)
}

export default List
