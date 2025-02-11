import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'

const { Title } = Typography

const EditHeader: FC = () => {
	const nav = useNavigate()

	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
						返回
					</Button>
					<Title level={5}>问卷标题</Title>
				</div>
				<div className={styles.main}>main</div>
				<div className={styles.right}>right</div>
			</div>
		</div>
	)
}

export default EditHeader
