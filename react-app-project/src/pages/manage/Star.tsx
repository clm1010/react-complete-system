import type { FC } from 'react'
import { useTitle } from 'ahooks'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import ListSearch from '../../components/ListSearch/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography

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

const Star: FC = () => {
	useTitle('我的问卷 - 标星问卷')

	// 使用自定义 hooks 获取数据
	const { loading, data = {} } = useLoadQuestionListData({ isStar: true })
	const { list = [], total = 0 } = data

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>标星问卷</Title>
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
				{!loading && list.length === 0 && (
					<Empty
						image={Empty.PRESENTED_IMAGE_DEFAULT}
						styles={{ image: { height: 100 } }}
						description={<Typography.Text>暂无标星问卷</Typography.Text>}
					></Empty>
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
			{!loading && list.length > 0 && <div className={styles.footer}>分页</div>}
		</>
	)
}

export default Star
