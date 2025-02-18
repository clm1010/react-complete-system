import type { FC } from 'react'
import {
	DndContext,
	closestCenter,
	MouseSensor,
	useSensor,
	useSensors,
	DragEndEvent
} from '@dnd-kit/core'
import {
	// arrayMove,
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'

/**
 * @description 拖拽组件类型
 */
type PropsType = {
	children: JSX.Element | JSX.Element[] // 子组件，类似 vue 的 slot
	items: Array<{ id: string; [key: string]: any }>
	onDragEnd: (oldIndex: number, newIndex: number) => void
}

/**
 * @description 拖拽组件容器
 * @param props 组件类型
 */
const SortableContainer: FC<PropsType> = (props: PropsType) => {
	const { children, items, onDragEnd } = props

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 8 // 8px 内可以触发拖拽
			}
		})
	)

	// 拖拽结束
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (over == null) return

		if (active.id !== over.id) {
			const oldIndex = items.findIndex((c) => c.fe_id === active.id)
			const newIndex = items.findIndex((c) => c.fe_id === over.id)
			// 调用 onDragEnd
			onDragEnd(oldIndex, newIndex)
		}
	}

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
		</DndContext>
	)
}
export default SortableContainer
