import type { FC } from 'react'
import { Outlet } from 'react-router'
import Loading from '../components/Loading'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

/**
 * @description QuestionLayout 问卷布局
 */
const QuestionLayout: FC = () => {
	// 加载用户信息
	const { waitingUserData } = useLoadUserData()
	// 用户没有登录时，跳转到登录页面
	useNavPage(waitingUserData)

	return (
		<div style={{ height: '100vh' }}>
			{waitingUserData ? (
				<div
					style={{
						width: '100%',
						height: `calc(100vh - 64px - 71px)`,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Loading tip="加载中..." size="large" />
				</div>
			) : (
				<Outlet />
			)}
		</div>
	)
}

export default QuestionLayout
