import type { FC } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'

// 临时静态展示 Title Input 组件
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'

type PropsType = {
	loading: boolean
}

const contentStyle: React.CSSProperties = {
	padding: 60,
	background: 'rgba(0, 0, 0, 0.02)',
	borderRadius: 4
}
const content = <div style={contentStyle} />

const EditCanvas: FC<PropsType> = (props: PropsType) => {
	const { loading } = props
	if (loading) {
		return (
			<div className={styles.center}>
				<Spin tip="加载中...">{content}</Spin>
			</div>
		)
	}

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
