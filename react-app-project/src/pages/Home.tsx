import type { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Home: FC = () => {
	// 第三方hook
	const nav = useNavigate()

	// 路由跳转
	const handlerClick = () => {
		nav('/login')
	}

	return (
		<div>
			<button onClick={handlerClick}>登录</button>
			<Link to="/register">注册</Link>
		</div>
	)
}

export default Home
