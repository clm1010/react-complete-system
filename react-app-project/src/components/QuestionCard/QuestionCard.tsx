import { FC } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
	EditOutlined,
	LineChartOutlined,
	StarOutlined,
	CopyOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../../services/question'
import styles from './QuestionCard.module.scss'

const { confirm } = Modal

type PropsType = {
	_id: string // 服务端 mongodb，自动 _id 不重复，在服务端创建
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
	const nav = useNavigate()
	const { _id, title, isPublished, isStar, answerCount, createdAt } = props

	// 修改标星状态
	const [isStarState, setIsStarState] = useState(isStar)

	// 更新标星状态
	const { loading: changeStarLoading, run: changeStar } = useRequest(
		async () => {
			await updateQuestionService(_id, { isStar: !isStarState })
		},
		{
			onSuccess: () => {
				setIsStarState(!isStarState)
				message.success('已更新标星状态')
			},
			manual: true
		}
	)

	// 复制问卷
	const { loading: copyLoading, run: handleCopy } = useRequest(
		async () => {
			const data = await duplicateQuestionService(_id)
			return data
		},
		{
			onSuccess: (res) => {
				message.success('复制成功')
				nav(`/question/edit/${res.id}`) // 跳转到问卷编辑页
			},
			manual: true
		}
	)

	const [isDeleteState, setIsDeleteState] = useState(false)
	// 删除问卷
	const { loading: deleteLoading, run: handleDeleteQuestion } = useRequest(
		async () => {
			const data = await updateQuestionService(_id, { isDeleted: true })
			return data
		},
		{
			onSuccess: () => {
				setIsDeleteState(true)
				message.success('删除成功')
			},
			manual: true
		}
	)

	/**
	 * @deprecated 删除
	 */
	const handleDelete = () => {
		confirm({
			title: '确定删除该问卷吗?',
			icon: <ExclamationCircleOutlined />,
			content: '删除后无法恢复',
			okText: '确定',
			cancelText: '取消',
			onOk() {
				handleDeleteQuestion()
			},
			onCancel() {
				console.log('Cancel')
			}
		})
	}

	// 已经删除的问卷，不要再渲染卡片了
	if (isDeleteState) return null

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.left}>
					<Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
						<Space>
							{isStarState && <StarOutlined style={{ color: 'red' }} />}
							{title}
						</Space>
					</Link>
				</div>
				<div className={styles.right}>
					<Space>
						{isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
						<span>答卷：{answerCount}</span>
						<span>{createdAt}</span>
					</Space>
				</div>
			</div>
			<Divider style={{ margin: '12px 0' }} />
			<div className={styles['button-container']}>
				<div className={styles.left}>
					<Space>
						<Button
							type="text"
							size="small"
							icon={<EditOutlined />}
							onClick={() => nav(`/question/edit/${_id}`)}
						>
							编辑问卷
						</Button>
						<Button
							type="text"
							size="small"
							icon={<LineChartOutlined />}
							disabled={!isPublished}
							onClick={() => nav(`/question/stat/${_id}`)}
						>
							问卷统计
						</Button>
					</Space>
				</div>
				<div className={styles.right}>
					<Space>
						<Button
							type="text"
							size="small"
							icon={<StarOutlined />}
							onClick={changeStar}
							loading={changeStarLoading}
						>
							{isStarState ? '取消标星' : '标星'}
						</Button>
						<Popconfirm
							title="确定复制该问卷?"
							okText="确定"
							cancelText="取消"
							onConfirm={handleCopy}
						>
							<Button type="text" size="small" icon={<CopyOutlined />} loading={copyLoading}>
								复制
							</Button>
						</Popconfirm>
						<Button
							type="text"
							size="small"
							icon={<DeleteOutlined />}
							onClick={handleDelete}
							loading={deleteLoading}
						>
							删除
						</Button>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default QuestionCard
