import type { FC } from 'react'
import { Outlet } from 'react-router'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo/Logo'
import UserInfo from '../components/UserInfo/UserInfo'

const { Header, Content, Footer } = Layout
/**
 * @description MainLayout 主布局
 */
const MainLayout: FC = () => {
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
				<Outlet />
			</Content>
			<Footer className={styles.footer}>我的问卷 &copy;2024 - present. Created by CLM</Footer>
		</Layout>
	)
}

export default MainLayout
