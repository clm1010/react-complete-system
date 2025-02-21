import type { FC } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Typography } from 'antd'
import Loading from '../../../components/Loading'
import { getQuestionStatListService } from '../../../services/stat'
import styles from './PageStat.module.scss'

const { Title } = Typography

/**
 * @description 定义 props 接收的类型
 */
type PropsType = {
	selectedComponentId: string
	setSelectedComponentId: (id: string) => void
	setSelectedComponentType: (type: string) => void
}

/**
 * @description 问卷统计页
 */
const PageStat: FC<PropsType> = (props: PropsType) => {
	const { id = '' } = useParams()
	const [total, setTotal] = useState(0)
	const [list, setList] = useState([])

	const { loading } = useRequest(
		async () => {
			const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 })
			return res
		},
		{
			onSuccess: (res) => {
				const { total, list = [] } = res
				setTotal(total)
				setList(list)
			}
		}
	)
	return (
		<div className={styles.container}>
			<Title level={4}>答卷数量：{!loading && total}</Title>
			{loading && (
				<div className={styles.center}>
					<Loading tip="加载中..." size="default" />
				</div>
			)}
		</div>
	)
}

export default PageStat
