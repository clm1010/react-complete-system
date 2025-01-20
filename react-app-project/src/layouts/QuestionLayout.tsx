import type { FC } from 'react'
import { Outlet } from 'react-router'
const QuestionLayout: FC = () => {
	return (
		<>
			<h1>QuestionLayout</h1>
			<div>
				<Outlet />
			</div>
		</>
	)
}

export default QuestionLayout
