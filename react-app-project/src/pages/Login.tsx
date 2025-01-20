import type { FC } from 'react'
import { useNavigate } from 'react-router'

const Login: FC = () => {
	// 第三方hook
	const nav = useNavigate()

	// 路由跳转
	const handlerClick = () => {
		nav(-1)
	}

	return (
		<div>
			<button onClick={handlerClick}>返回</button>
		</div>
	)
}

export default Login
