import type { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents/index'
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer/index'
import styles from './EditCanvas.module.scss'

type PropsType = {
	loading: boolean
}

const contentStyle: React.CSSProperties = {
	padding: 60,
	background: 'rgba(0, 0, 0, 0.02)',
	borderRadius: 4
}
const content = <div style={contentStyle} />

const genComponent = (componentInfo: ComponentInfoType) => {
	const { type, props } = componentInfo // 每个组件的信息，是从 redux store 中获取（服务的获取）
	const componentConf = getComponentConfByType(type)
	if (componentConf == null) return null

	const { Component } = componentConf
	return <Component {...props} />
}
/**
 * @description 画布区域
 * @param props  loading: boolean
 */
const EditCanvas: FC<PropsType> = (props: PropsType) => {
	const { loading } = props
	const { componentList, selectedId } = useGetComponentInfo()

	const dispatch = useDispatch()

	// 点击选中组件
	const handlerClick = (event: MouseEvent, id: string) => {
		event.stopPropagation() // 阻止事件冒泡
		dispatch(changeSelectedId(id))
	}

	if (loading) {
		return (
			<div className={styles.center}>
				<Spin tip="加载中...">{content}</Spin>
			</div>
		)
	}

	return (
		<div className={styles.canvas}>
			{/* 根据 componentList 渲染对应的组件 */}
			{componentList.map((item) => {
				const { fe_id } = item

				// 拼接 class name
				const wrapperDefaultClassName = styles['component-wrapper']
				const selectedClassName = styles.selected
				const wrapperClassName = classNames({
					[wrapperDefaultClassName]: true,
					[selectedClassName]: fe_id === selectedId
				})

				return (
					<div key={fe_id} className={wrapperClassName} onClick={(e) => handlerClick(e, fe_id)}>
						<div className={styles.component}>{genComponent(item)}</div>
					</div>
				)
			})}
		</div>
	)
}

export default EditCanvas
