import type { FC } from 'react'
import { Link, useNavigate } from 'react-router'
import { useTitle, useRequest } from 'ahooks'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router'
import { registerService } from '../services/user'
import styles from './Register.module.scss'
const { Title } = Typography

const Register: FC = () => {
	useTitle('注册')

	// const [form] = Form.useForm() // useForm 第三方 hook
	const nav = useNavigate()

	const { loading, run } = useRequest(
		async (values) => {
			const { username, password, nickname } = values
			await registerService(username, password, nickname)
		},
		{
			manual: true,
			onSuccess: () => {
				message.success('注册成功')
				nav(LOGIN_PATHNAME)
			}
		}
	)

	// 表单提交
	const onFinish = (values: {
		nickname: string
		username: string
		password: string
		confirmPassword: string
	}) => {
		// console.log('Success:', values)
		run(values)
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
					<Form.Item
						label="用户名"
						name="username"
						rules={[
							{
								required: true,
								message: '请输入用户名'
							},
							{
								type: 'string',
								min: 3,
								max: 20,
								message: '用户名长度为3-20个字符'
							},
							{
								pattern: /^[a-zA-Z0-9_]{3,20}$/,
								message: '用户名只能包含字母、数字、下划线'
							}
						]}
					>
						<Input placeholder="请输入用户名" allowClear />
					</Form.Item>
					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
					>
						<Input.Password placeholder="请输入密码" allowClear />
					</Form.Item>
					<Form.Item
						label="确认密码"
						name="confirmPassword"
						dependencies={['password']} // 依赖 password，如果 password 变化了就会触发 validator 验证
						rules={[
							{ required: true, message: '请输入密码' },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									}
									return Promise.reject(new Error('两次密码不一致'))
								}
							})
						]}
					>
						<Input.Password placeholder="请输入确认密码" allowClear />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 20 }}>
						<Space>
							<Button type="primary" htmlType="submit" loading={loading}>
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
