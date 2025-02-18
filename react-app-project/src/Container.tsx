import type { FC } from 'react'
import { useState } from 'react'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'

import Item from './Item'

type ComponentType = {
	fe_id: string
	title: string
}

const Container: FC = () => {
	// const [items, setItems] = useState(['a', 'b', 'c'])
	const [items, setItems] = useState<ComponentType[]>([
		{
			fe_id: 'c1',
			title: '组件1'
		},
		{
			fe_id: 'c2',
			title: '组件2'
		},
		{
			fe_id: 'c3',
			title: '组件3'
		}
	])
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	// drag end 拖拽结束 处理事件
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (over == null) return

		if (active.id !== over.id) {
			setItems((items) => {
				// const oldIndex = items.indexOf(active.id.toString())
				// const newIndex = items.indexOf(over.id.toString())

				// items 数据结构变化，需要根据id查找
				const oldIndex = items.findIndex((c) => c.fe_id === active.id)
				const newIndex = items.findIndex((c) => c.fe_id === over.id)

				// console.log('oldIndex', oldIndex, 'newIndex', newIndex)
				return arrayMove(items, oldIndex, newIndex)
			})
		}
	}

	// 处理原始数据结构，增加id
	const itemWithId = items.map((c) => {
		return {
			...c,
			id: c.fe_id // SortableContext 组件的 items，需要每个元素都有 id
		}
	})

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={itemWithId} strategy={verticalListSortingStrategy}>
				{itemWithId.map((c) => (
					<Item key={c.id} id={c.id} title={c.title} />
				))}
			</SortableContext>
		</DndContext>
	)
}

export default Container
