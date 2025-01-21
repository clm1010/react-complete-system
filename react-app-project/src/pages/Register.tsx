import type { FC } from 'react'
import { Link } from 'react-router'
import { useTitle } from 'ahooks'
import { Typography, Space, Form, Input, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router'
import styles from './Register.module.scss'
const { Title } = Typography

const Register: FC = () => {
	useTitle('注册')

	const onFinish = (values: {
		nickname: string
		username: string
		password: string
		confirmPassword: string
	}) => {
		console.log('Success:', values)
	}

	return (
		<div className={styles.container}>
			<div>
				<Space>
					<Title level={2}>
						<UserAddOutlined />
					</Title>
					<Title level={2}>注册新用户</Title>
				</Space>
			</div>
			<div>
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 20 }}
					layout="horizontal"
					onFinish={onFinish}
				>
					<Form.Item label="昵称" name="nickname">
						<Input placeholder="请输入昵称" allowClear />
					</Form.Item>
					<Form.Item label="用户名" name="username">
						<Input placeholder="请输入用户名" allowClear />
					</Form.Item>
					<Form.Item label="密码" name="password">
						<Input.Password placeholder="请输入密码" allowClear />
					</Form.Item>
					<Form.Item label="确认密码" name="confirmPassword">
						<Input.Password placeholder="请输入确认密码" allowClear />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 20 }}>
						<Space>
							<Button type="primary" htmlType="submit">
								注册
							</Button>
							<Link to={LOGIN_PATHNAME}>已有账户，请登录</Link>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Register
