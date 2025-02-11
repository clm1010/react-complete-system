import type { FC } from 'react'
import { nanoid } from 'nanoid'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents/index'
import { addComponent } from '../../../store/componentsReducer/index'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

// 生成组件
const genComponent = (c: ComponentConfType) => {
	const { title, type, Component, defaultProps } = c

	const dispatch = useDispatch()

	const handlerClick = () => {
		dispatch(addComponent({ fe_id: nanoid(5), type, title, props: defaultProps }))
	}

	return (
		<div key={type} className={styles.wrapper} onClick={handlerClick}>
			<div className={styles.component}>
				<Component />
			</div>
		</div>
	)
}

/**
 * @description 组件库
 * @returns ComponentLib 组件
 */
const ComponentLib: FC = () => {
	return (
		<>
			{componentConfGroup.map((group, index) => {
				const { groupId, groupName, components } = group
				return (
					<div key={groupId}>
						<Title level={5} style={{ marginTop: index > 0 ? '20px' : '0' }}>
							{groupName}
						</Title>
						<div>{components.map((c) => genComponent(c))}</div>
					</div>
				)
			})}
		</>
	)
}

export default ComponentLib
