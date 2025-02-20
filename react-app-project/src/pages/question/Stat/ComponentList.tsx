import type { FC } from 'react'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import styles from './ComponentList.module.scss'

/**
 * @description 定义 props 接收的类型
 */
type PropsType = {
	selectedComponentId: string
	setSelectedComponentId: (id: string) => void
	setSelectedComponentType: (type: string) => void
}

/**
 * @description 组件列表
 */
const ComponentList: FC<PropsType> = (props: PropsType) => {
	const { componentList } = useGetComponentInfo()

	const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

	return (
		<div className={styles.container}>
			{componentList
				.filter((c) => !c.isHidden) // 过滤隐藏的组件
				.map((c) => {
					const { fe_id, props, type } = c
					const componentConf = getComponentConfByType(type)
					if (componentConf == null) return null

					const { Component } = componentConf

					// 拼接 class name
					const wrapperDefaultClassName = styles['component-wrapper']
					const selectedClassName = styles.selected
					const wrapperClassName = classNames({
						[wrapperDefaultClassName]: true,
						[selectedClassName]: fe_id === selectedComponentId // 是否选中
					})
					return (
						<div
							className={wrapperClassName}
							key={fe_id}
							onClick={() => {
								setSelectedComponentId(fe_id)
								setSelectedComponentType(type)
							}}
						>
							<div className={styles.component}>
								<Component {...props}></Component>
							</div>
						</div>
					)
				})}
		</div>
	)
}

export default ComponentList
