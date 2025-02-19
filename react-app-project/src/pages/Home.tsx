import type { FC } from 'react'
import { useNavigate } from 'react-router'
import { useTitle } from 'ahooks'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { Button, Typography } from 'antd'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
	useTitle('我的问卷')
	// 第三方hook
	const nav = useNavigate()

	// // 路由跳转
	// const handlerClick = () => {
	// 	// nav('/login?b=2') // 传递参数 自己拼接
	// 	nav({
	// 		pathname: '/login',
	// 		search: '?b=2'
	// 	})
	// }
	// useEffect(() => {
	// 	fetch('/api/test')
	// 		.then((res) => {
	// 			return res.json()
	// 		})
	// 		.then((data) => {
	// 			console.log('fetch data', data)
	// 		})
	// }, [])

	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<Title>问卷调查 | 在线投票</Title>
				<Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到问卷 980 份</Paragraph>
				<div>
					<Button type="primary" size="large" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
						开始使用
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Home
