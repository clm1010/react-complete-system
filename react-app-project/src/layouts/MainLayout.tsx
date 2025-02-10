import type { FC } from 'react'
import { Outlet } from 'react-router'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo/Logo'
import UserInfo from '../components/UserInfo/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

const contentStyle: React.CSSProperties = {
	padding: 60,
	background: 'rgba(0, 0, 0, 0.02)',
	borderRadius: 4
}
const content = <div style={contentStyle} />

/**
 * @description MainLayout 主布局
 */
const MainLayout: FC = () => {
	const { waitingUserData } = useLoadUserData()
	useNavPage(waitingUserData)

	return (
		<Layout>
			<Header className={styles.header}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.right}>
					<UserInfo />
				</div>
			</Header>
			<Content className={styles.main}>
				{waitingUserData ? (
					<Spin
						tip="加载中..."
						size="large"
						style={{
							width: '100%',
							height: `calc(100vh - 64px - 71px)`,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						{content}
					</Spin>
				) : (
					<Outlet />
				)}
			</Content>
			<Footer className={styles.footer}>我的问卷 &copy;2024 - present. Created by CLM</Footer>
		</Layout>
	)
}

export default MainLayout
