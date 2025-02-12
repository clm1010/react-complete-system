import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined, CheckOutlined, ArrowUpOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'

const { Title } = Typography

const EditHeader: FC = () => {
	const nav = useNavigate()

	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<Title level={5} style={{ margin: 0 }}>
							问卷标题
						</Title>
					</Space>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<Space>
						<Button icon={<CheckOutlined />}>保存</Button>
						<Button type="primary" icon={<ArrowUpOutlined />}>
							发布
						</Button>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
