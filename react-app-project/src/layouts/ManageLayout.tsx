import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'

/**
 * @description ManageLayout 左右布局
 */
const ManageLayout: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<p>ManageLayout left</p>
				<button>创建问卷</button>
				<br />
				<button>我的问卷</button>
				<br />
				<button>我的回收站</button>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	)
}

export default ManageLayout
