import type { FC } from 'react'
import { useTitle, useRequest } from 'ahooks'
import { useState } from 'react'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch/ListSearch'
import ListPage from '../../components/ListPage/ListPage'
import { updateQuestionService } from '../../services/question'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

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

const Trash: FC = () => {
	useTitle('我的问卷 - 回收站')

	// 使用自定义 hooks 获取数据
	const { loading, data = {}, refresh } = useLoadQuestionListData({ isDeleted: true })
	const { list = [], total = 0 } = data

	// 记录选中的表格Id
	// useState<string[]>([]) 定义数组类型 string
	const [selectedIds, setSelectedIds] = useState<string[]>([])

	// 还原问卷
	const { loading: recoverLoading, run: recover } = useRequest(
		async () => {
			for await (const id of selectedIds) {
				await updateQuestionService(id, { isDeleted: false })
			}
		},
		{
			onSuccess: () => {
				message.success('还原成功')
				refresh() // 手动刷新列表
			},
			debounceWait: 500, // 防抖时间
			manual: true
		}
	)

	// 表格列
	const tableColumns = [
		{
			title: '问卷标题',
			dataIndex: 'title',
			key: 'title'
		},
		{
			title: '是否发布',
			dataIndex: 'isPublished',
			key: 'isPublished',
			render: (isPublished: boolean) => {
				return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
			}
		},
		{
			title: '标星',
			dataIndex: 'isStar',
			key: 'isStar',
			render: (isStar: boolean) => {
				return isStar ? <Tag color="processing">是</Tag> : <Tag>否</Tag>
			}
		},
		{
			title: '答卷数量',
			dataIndex: 'answerCount',
			key: 'answerCount'
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt'
		}
	]

	// 处理彻底删除
	const handleCompleteDel = () => {
		confirm({
			title: '是否彻底删除?',
			icon: <ExclamationCircleOutlined />,
			content: '彻底删除后无法恢复，请谨慎操作',
			okText: '确认删除',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				window.alert(JSON.stringify(selectedIds))
			},
			onCancel() {
				console.log('Cancel')
			}
		})
	}

	// 表格处理操作
	const TableElem = (
		<>
			<div style={{ marginBottom: '16px' }}>
				<Space>
					<Button
						type="primary"
						disabled={selectedIds.length === 0}
						onClick={recover}
						loading={recoverLoading}
					>
						还原
					</Button>
					<Button
						type="primary"
						danger
						disabled={selectedIds.length === 0}
						onClick={handleCompleteDel}
					>
						彻底删除
					</Button>
				</Space>
			</div>
			<Table
				dataSource={list}
				columns={tableColumns}
				pagination={false}
				rowKey={(q: questionListType) => q._id}
				rowSelection={{
					type: 'checkbox',
					onChange: (selectedRowKeys) => {
						setSelectedIds(selectedRowKeys as string[])
					}
				}}
			/>
		</>
	)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
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
						description={<Typography.Text>暂无问卷</Typography.Text>}
					></Empty>
				)}

				{/* 问卷列表 */}
				{!loading && list.length > 0 && TableElem}
			</div>
			{!loading && list.length > 0 && (
				<div className={styles.footer}>
					<ListPage total={total} />
				</div>
			)}
		</>
	)
}

export default Trash
