import type { FC } from 'react'
import { Outlet } from 'react-router'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const contentStyle: React.CSSProperties = {
	padding: 60,
	background: 'rgba(0, 0, 0, 0.02)',
	borderRadius: 4
}
const content = <div style={contentStyle} />

const QuestionLayout: FC = () => {
	// 加载用户信息
	const { waitingUserData } = useLoadUserData()
	// 用户没有登录时，跳转到登录页面
	useNavPage(waitingUserData)

	return (
		<div style={{ height: '100vh' }}>
			{waitingUserData ? (
				<Spin
					tip="加载中..."
					size="large"
					style={{
						width: '100%',
						height: `calc(100vh - 64px - 71px)`,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					{content}
				</Spin>
			) : (
				<Outlet />
			)}
		</div>
	)
}

export default QuestionLayout
