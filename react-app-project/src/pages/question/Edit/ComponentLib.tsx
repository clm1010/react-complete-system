import type { FC } from 'react'
// import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { Typography } from 'antd'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents/index'
import { addComponent } from '../../../store/componentsReducer/index'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

/**
 * @description 组件库
 * @returns ComponentLib 组件
 */
const ComponentLib: FC = () => {
	const dispatch = useDispatch()
	// 生成组件
	const genComponent = (c: ComponentConfType) => {
		const { title, type, Component, defaultProps } = c

		// 这个写法会报错，
		// 可以不用 genComponent 这种形式。换一种方式：定义一个 Wrapper 组件，然后把 c 作为 children 传递到 Wrapper 组件中。
		// const handlerClick = useCallback(() => {
		// 	dispatch(
		// 		addComponent({
		// 			fe_id: nanoid(),
		// 			title,
		// 			type,
		// 			props: defaultProps
		// 		})
		// 	)
		// }, [])

		const handlerClick = () => {
			dispatch(
				addComponent({
					fe_id: nanoid(),
					title,
					type,
					props: defaultProps
				})
			)
		}

		return (
			<div key={type} className={styles.wrapper} onClick={handlerClick}>
				<div className={styles.component}>
					<Component />
				</div>
			</div>
		)
	}

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
