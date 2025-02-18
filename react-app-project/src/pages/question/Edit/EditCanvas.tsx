import type { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents/index'
import {
	ComponentInfoType,
	changeSelectedId,
	moveComponent
} from '../../../store/componentsReducer/index'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
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

	// 使用 自定义 hooks 绑定键盘快捷键事件
	useBindCanvasKeyPress()

	if (loading) {
		return (
			<div className={styles.center}>
				<Spin tip="加载中...">{content}</Spin>
			</div>
		)
	}

	// SortableContainer 组件的 items 属性，需要每个 item 都有 id
	const componentListWithId = componentList.map((c) => {
		return { ...c, id: c.fe_id }
	})

	// 拖拽排序结束
	const handleDragEnd = (oldIndex: number, newIndex: number) => {
		dispatch(moveComponent({ oldIndex, newIndex }))
	}

	return (
		<SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
			<div className={styles.canvas}>
				{/* 根据 componentList 渲染对应的组件 */}
				{componentList
					.filter((c) => !c.isHidden)
					.map((item) => {
						const { fe_id, isLocked } = item

						// 拼接 class name
						const wrapperDefaultClassName = styles['component-wrapper']
						const selectedClassName = styles.selected
						const lockedClassName = styles.locked
						const wrapperClassName = classNames({
							[wrapperDefaultClassName]: true,
							[selectedClassName]: fe_id === selectedId,
							[lockedClassName]: isLocked
						})

						return (
							// SortableItem 每个排序 item
							<SortableItem key={fe_id} id={fe_id}>
								<div className={wrapperClassName} onClick={(e) => handlerClick(e, fe_id)}>
									<div className={styles.component}>{genComponent(item)}</div>
								</div>
							</SortableItem>
						)
					})}
			</div>
		</SortableContainer>
	)
}

export default EditCanvas
