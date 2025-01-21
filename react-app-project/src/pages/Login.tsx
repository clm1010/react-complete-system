import type { FC } from 'react'
import { useNavigate } from 'react-router'
import { useTitle } from 'ahooks'

const Login: FC = () => {
	useTitle('登录')
	// 第三方hook
	const nav = useNavigate()

	// 路由跳转
	const handleClickGoBack = () => {
		nav(-1)
	}

	return (
		<div>
			<button onClick={handleClickGoBack}>返回</button>
		</div>
	)
}

export default Login
