import type { FC } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Typography, Table, Pagination } from 'antd'
import Loading from '../../../components/Loading'
import { getQuestionStatListService } from '../../../services/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { STAT_PAGE, STAT_PAGE_SIZE } from '../../../constant'
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
	const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

	const { id = '' } = useParams()

	const [page, setPage] = useState(STAT_PAGE)
	const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
	const [total, setTotal] = useState(0)
	const [list, setList] = useState([])

	// 获取问卷统计列表数据
	const { loading } = useRequest(
		async () => {
			const res = await getQuestionStatListService(id, { page, pageSize })
			return res
		},
		{
			onSuccess: (res) => {
				const { total, list = [] } = res
				setTotal(total)
				setList(list)
			},
			refreshDeps: [id, page, pageSize]
		}
	)

	const { componentList } = useGetComponentInfo()

	const columns = componentList.map((c) => {
		const { fe_id, title, props = {}, type } = c
		const colTitle = props.title || title
		return {
			// title: colTitle,
			title: (
				<div
					style={{ cursor: 'pointer' }}
					onClick={() => {
						setSelectedComponentId(fe_id)
						setSelectedComponentType(type)
					}}
				>
					<span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
						{colTitle}
					</span>
				</div>
			),
			dataIndex: fe_id
		}
	})
	// const dataSource = list.map((i: any) => ({
	// 	...i,
	// 	key: i._id
	// }))
	// const TableElem = <Table columns={columns} dataSource={dataSource} pagination={false} />
	const TableElem = (
		<>
			<Table columns={columns} dataSource={list} pagination={false} rowKey="_id" />
			<div className={styles['pagination-wrapper']}>
				<Pagination
					align="center"
					current={page}
					pageSize={pageSize}
					pageSizeOptions={['5', '10', '20', '30', '40', '50']}
					total={total}
					onChange={(page) => setPage(page)}
					onShowSizeChange={(page, pageSize) => {
						setPage(page)
						setPageSize(pageSize)
					}}
				/>
			</div>
		</>
	)

	return (
		<div className={styles.container}>
			<Title level={4}>答卷数量：{!loading && total}</Title>
			{loading && (
				<div className={styles.center}>
					<Loading tip="加载中..." size="default" />
				</div>
			)}
			{!loading && TableElem}
		</div>
	)
}

export default PageStat
