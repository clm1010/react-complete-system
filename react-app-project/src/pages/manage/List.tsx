import type { FC } from 'react'
import { useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './List.module.scss'

const rawQuestionList = [
	{
		_id: 'q1',
		title: '问卷1',
		isPublished: false,
		isStar: false,
		answerCount: 5,
		createdAt: '5月10日 13:23'
	},
	{
		_id: 'q2',
		title: '问卷2',
		isPublished: true,
		isStar: false,
		answerCount: 5,
		createdAt: '5月11日 13:23'
	},
	{
		_id: 'q3',
		title: '问卷3',
		isPublished: false,
		isStar: false,
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
	const [questionList, setQuestionList] = useState(rawQuestionList)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<h3>我的问卷</h3>
				</div>
				<div className={styles.right}>(搜索)</div>
			</div>
			<div className={styles.content}>
				{questionList.map((question) => {
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
			<div className={styles.footer}>footer</div>
		</>
	)
}

export default List
