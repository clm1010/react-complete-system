import type { FC } from 'react'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { LOGIN_PATHNAME } from '../../router'
import { removeUserToken } from '../../utils/user-token'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import { logoutReducer } from '../../store/useReducer'

const UserInfo: FC = () => {
	const nav = useNavigate()

	const dispatch = useDispatch()

	const { username, nickname } = useGetUserInfo() // redux store 中的用户信息

	// 退出登录
	const handleLogout = () => {
		dispatch(logoutReducer()) // 清除用户信息 redux user 数据
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
