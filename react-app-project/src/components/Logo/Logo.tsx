import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../../router'
import styles from './Logo.module.scss'

const { Title } = Typography

const Logo: FC = () => {
	const { username } = useGetUserInfo()

	const [pathname, setPathname] = useState(HOME_PATHNAME) // 设置默认路径为 HOME_PATHNAME '/'

	useEffect(() => {
		if (username) {
			setPathname(MANAGE_INDEX_PATHNAME)
		}
	}, [username])

	return (
		<div className={styles.container}>
			<Link to={pathname}>
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
