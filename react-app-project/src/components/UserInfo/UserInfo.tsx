import type { FC } from 'react'
import { Link } from 'react-router'
import { LOGIN_PATHNAME } from '../../router'

const UserInfo: FC = () => {
	return (
		<>
			<Link to={LOGIN_PATHNAME}>登录</Link>
		</>
	)
}

export default UserInfo
