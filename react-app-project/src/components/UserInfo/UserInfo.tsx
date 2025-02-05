import type { FC } from 'react'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router'
import { LOGIN_PATHNAME } from '../../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../../services/user'
import { removeUserToken } from '../../utils/user-token'

const UserInfo: FC = () => {
	const nav = useNavigate()

	const { data } = useRequest(getUserInfoService)
	const { username, nickname } = data || {}

	// 退出登录
	const handleLogout = () => {
		removeUserToken() // 清除用户token
		message.success('退出成功')
		nav(LOGIN_PATHNAME) // 跳转到首页
	}

	const UserInfo = (
		<>
			<span style={{ color: '#e8e8e8' }}>
				<UserOutlined />
				{nickname}
			</span>
			<Button type="link" onClick={handleLogout}>
				退出
			</Button>
		</>
	)

	const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

	return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
