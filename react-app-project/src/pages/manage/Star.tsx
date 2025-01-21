import type { FC } from 'react'
import { useState } from 'react'
import { useTitle } from 'ahooks'
// import { useSearchParams } from 'react-router-dom'
import { Typography, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import styles from './common.module.scss'

const { Title } = Typography

const rawQuestionList = [
	{
		_id: 'q1',
		title: '问卷1',
		isPublished: false,
		isStar: true,
		answerCount: 3,
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
		answerCount: 6,
		createdAt: '5月12日 13:23'
	}
]

const Star: FC = () => {
	useTitle('我的问卷 - 标星问卷')
	const [questionList, setQuestionList] = useState(rawQuestionList)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>标星问卷</Title>
				</div>
				<div className={styles.right}>(搜索)</div>
			</div>
			<div className={styles.content}>
				{questionList.length === 0 && (
					<Empty
						image={Empty.PRESENTED_IMAGE_DEFAULT}
						styles={{ image: { height: 100 } }}
						description={<Typography.Text>暂无标星问卷</Typography.Text>}
					></Empty>
				)}
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
			<div className={styles.footer}>分页</div>
		</>
	)
}

export default Star
