import type { FC } from 'react'
import { Outlet } from 'react-router'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
	const { waitingUserData } = useLoadUserData()
	useNavPage(waitingUserData)

	return (
		<>
			<h1>QuestionLayout</h1>
			<div>
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
					/>
				) : (
					<Outlet />
				)}
			</div>
		</>
	)
}

export default QuestionLayout
