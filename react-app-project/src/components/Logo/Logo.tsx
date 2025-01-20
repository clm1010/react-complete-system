import type { FC } from 'react'
import { Link } from 'react-router'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
	return (
		<div className={styles.container}>
			<Link to="/">
				<Space>
					<Title>
						<FormOutlined />
					</Title>
					<Title level={2}>我的卷星</Title>
				</Space>
			</Link>
		</div>
	)
}

export default Logo
