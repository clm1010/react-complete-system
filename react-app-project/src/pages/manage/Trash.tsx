import type { FC } from 'react'
import { useTitle } from 'ahooks'
import { useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { Typography, Empty, Table, Tag, Button, Space, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography
const { confirm } = Modal

// 数据源
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

const Trash: FC = () => {
	useTitle('我的问卷 - 回收站')

	const [questionList, setQuestionList] = useState(rawQuestionList)

	// 记录选中的表格Id
	// useState<string[]>([]) 定义数组类型 string
	const [selectedIds, setSelectedIds] = useState<string[]>([])

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
					<Button type="primary" disabled={selectedIds.length === 0}>
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
				dataSource={questionList}
				columns={tableColumns}
				pagination={false}
				rowKey={(q) => q._id}
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
				{questionList.length === 0 && (
					<Empty
						image={Empty.PRESENTED_IMAGE_DEFAULT}
						styles={{ image: { height: 100 } }}
						description={<Typography.Text>暂无问卷</Typography.Text>}
					></Empty>
				)}
				{questionList.length > 0 && TableElem}
			</div>
			<div className={styles.footer}>分页</div>
		</>
	)
}

export default Trash
