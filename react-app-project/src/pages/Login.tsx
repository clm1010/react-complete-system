import type { FC } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router'
import { useTitle } from 'ahooks'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME } from '../router'
import styles from './Login.module.scss'

const { Title } = Typography
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

const rememberUser = (username: string, password: string) => {
	localStorage.setItem(USERNAME_KEY, username)
	localStorage.setItem(PASSWORD_KEY, password)
}

const deleteUserFromStorage = () => {
	localStorage.removeItem(USERNAME_KEY)
	localStorage.removeItem(PASSWORD_KEY)
}

const getUserInfoFromStorage = () => {
	const username = localStorage.getItem(USERNAME_KEY)
	const password = localStorage.getItem(PASSWORD_KEY)
	return { username, password }
}

const Login: FC = () => {
	useTitle('登录')

	const [form] = Form.useForm() // useForm 第三方 hook

	useEffect(() => {
		const { username, password } = getUserInfoFromStorage()
		if (username && password) {
			form.setFieldsValue({ username, password })
			onFinish({ username, password, remember: true })
		}
	}, [])

	/**
	 * @description 表单提交 登录
	 * @param values
	 */
	const onFinish = (values: { username: string; password: string; remember: boolean }) => {
		// console.log('Success:', values)
		const { username, password, remember } = values || {}
		if (remember) {
			rememberUser(username, password)
		} else {
			deleteUserFromStorage()
		}
	}

	return (
		<div className={styles.container}>
			<div>
				<Space>
					<Title level={2}>
						<UserAddOutlined />
					</Title>
					<Title level={2}>用户登录</Title>
				</Space>
			</div>
			<div>
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 20 }}
					onFinish={onFinish}
					initialValues={{ remember: true }}
					form={form}
				>
					<Form.Item label="用户名 " name="username">
						<Input placeholder="请输入用户名" allowClear />
					</Form.Item>
					<Form.Item label="密码" name="password">
						<Input.Password placeholder="请输入密码" allowClear />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 20 }} valuePropName="checked" name="remember">
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 20 }}>
						<Space>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
							<Link to={REGISTER_PATHNAME}>注册新用户</Link>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Login
