import type { FC } from 'react'
import styles from './EditCanvas.module.scss'

// 临时静态展示 Title Input 组件
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'

const EditCanvas: FC = () => {
	return (
		<div className={styles.canvas}>
			<div className={styles['component-wrapper']}>
				<div className={styles.component}>
					<QuestionTitle />
				</div>
			</div>
			<div className={styles['component-wrapper']}>
				<div className={styles.component}>
					<QuestionInput />
				</div>
			</div>
		</div>
	)
}

export default EditCanvas
