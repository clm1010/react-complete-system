import type { FC } from 'react'
import { useTitle } from 'ahooks'

const Register: FC = () => {
	useTitle('注册')
	return (
		<div>
			<h1>Register</h1>
		</div>
	)
}

export default Register
