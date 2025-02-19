import type { FC } from 'react'
import { useNavigate } from 'react-router'
import { Spin, Button, Result } from 'antd'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
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

	// 修改标题
	useTitle(`问卷统计 — ${title}`)

	// 加载中
	if (loading) {
		return (
			<div className={styles.center}>
				<Spin tip="加载中...">{content}</Spin>
			</div>
		)
	}

	// 判断问卷是否发布
	if (!isPublished) {
		return (
			<div>
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

	return <div>stat</div>
}

export default Stat
