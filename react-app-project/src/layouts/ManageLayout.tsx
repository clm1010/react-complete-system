import type { FC } from 'react'
import { useState } from 'react'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question'
import styles from './ManageLayout.module.scss'

/**
 * @description ManageLayout 左右布局
 */
const ManageLayout: FC = () => {
	const nav = useNavigate()
	const { pathname } = useLocation()

	// 创建问卷 loading
	const [loading, setLoading] = useState(false)

	// 创建问卷
	const handleCreateQuestion = async () => {
		setLoading(true)
		const data = await createQuestionService()
		const { id } = data || {}
		if (id) {
			nav(`/question/edit/${id}`)
			message.success('创建成功')
		}
		setLoading(false)
	}

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Space direction="vertical">
					<Button
						type="primary"
						size="large"
						icon={<PlusOutlined />}
						onClick={handleCreateQuestion}
						loading={loading}
					>
						新建问卷
					</Button>
					<Divider />
					<Button
						type={pathname.startsWith(MANAGE_INDEX_PATHNAME) ? 'default' : 'text'}
						size="large"
						icon={<BarsOutlined />}
						onClick={() => nav(MANAGE_INDEX_PATHNAME)}
					>
						我的问卷
					</Button>
					<Button
						type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
						size="large"
						icon={<StarOutlined />}
						onClick={() => nav('/manage/star')}
					>
						标星问卷
					</Button>
					<Button
						type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
						size="large"
						icon={<DeleteOutlined />}
						onClick={() => nav('/manage/trash')}
					>
						回收站
					</Button>
				</Space>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	)
}

export default ManageLayout
