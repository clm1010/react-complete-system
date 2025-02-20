import type { FC } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Spin, Button, Result } from 'antd'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import styles from './index.module.scss'

const contentStyle: React.CSSProperties = {
	padding: 60,
	background: 'rgba(0, 0, 0, 0.02)',
	borderRadius: 4
}
const content = <div style={contentStyle} />

/**
 * @description 问卷统计
 */
const Stat: FC = () => {
	const nav = useNavigate()
	const { loading } = useLoadQuestionData()
	const { title, isPublished } = useGetPageInfo()

	// 状态提升 selected 、type
	const [selectedComponentId, setSelectedComponentId] = useState('')
	const [selectedComponentType, setSelectedComponentType] = useState('')

	// 修改标题
	useTitle(`问卷统计 — ${title}`)

	// loading 效果
	const LoadingElem = (
		<div className={styles.center}>
			<Spin tip="加载中...">{content}</Spin>
		</div>
	)

	// Content Elem
	const getContentElem = () => {
		// 判断问卷是否发布
		if (typeof isPublished === 'boolean' && !isPublished) {
			return (
				<div style={{ flex: '1' }}>
					<Result
						status="warning"
						title="该页面尚未发布！"
						subTitle="抱歉，您访问的页面尚未发布，请先发布后查看！"
						extra={
							<Button type="primary" onClick={() => nav(-1)}>
								返回
							</Button>
						}
					/>
				</div>
			)
		}

		return (
			<>
				<div className={styles.left}>
					<ComponentList
						selectedComponentId={selectedComponentId}
						setSelectedComponentId={setSelectedComponentId}
						setSelectedComponentType={setSelectedComponentType}
					/>
				</div>
				<div className={styles.main}>中间</div>
				<div className={styles.right}>右侧</div>
			</>
		)
	}

	return (
		<div className={styles.container}>
			<StatHeader />
			<div className={styles['content-wrapper']}>
				{loading && LoadingElem}
				{!loading && <div className={styles.content}>{getContentElem()}</div>}
			</div>
		</div>
	)
}

export default Stat
