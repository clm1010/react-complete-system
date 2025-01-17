import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * @description MainLayout 主布局
 */
const MainLayout: FC = () => {
	return (
		<>
			<div>MainLayout header</div>
			<div>
				<Outlet />
			</div>
			<div>MainLayout footer</div>
		</>
	)
}

export default MainLayout
