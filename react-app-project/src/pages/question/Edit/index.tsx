import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer/index'
// import { useParams } from 'react-router'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import EditHeader from './EditHeader'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import styles from './index.module.scss'

const Edit: FC = () => {
	// const { id = '' } = useParams()
	const dispatch = useDispatch()
	const { loading } = useLoadQuestionData()
	const { title } = useGetPageInfo()

	// 修改标题
	useTitle(`编辑问卷 — ${title}`)

	// 清除选中的组件
	const clearSelectedId = () => {
		dispatch(changeSelectedId(''))
	}

	return (
		<div className={styles.container}>
			<EditHeader />
			<div className={styles['content-wrapper']}>
				<div className={styles.content}>
					<div className={styles.left}>
						<LeftPanel />
					</div>
					<div className={styles.main} onClick={clearSelectedId}>
						<div className={styles['canvas-wrapper']}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Edit
