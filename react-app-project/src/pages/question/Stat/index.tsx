import type { FC } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Result } from 'antd'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import Loading from '../../../components/Loading'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'
import styles from './index.module.scss'

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
		<div
			className={styles.center}
			style={{
				height: `calc(100vh - 57px - 48px)`
			}}
		>
			<Loading tip="加载中..." size="large" />
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
				<div className={styles.main}>
					<PageStat
						selectedComponentId={selectedComponentId}
						setSelectedComponentId={setSelectedComponentId}
						setSelectedComponentType={setSelectedComponentType}
					/>
				</div>
				<div className={styles.right}>
					<ChartStat
						selectedComponentId={selectedComponentId}
						selectedComponentType={selectedComponentType}
					/>
				</div>
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
