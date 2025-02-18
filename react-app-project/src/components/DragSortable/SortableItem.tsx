import type { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type PropsType = {
	id: string
	children: JSX.Element
}

/**
 * @description 拖拽组件 item
 * @param props { id: string, children: JSX.Element }
 */
const SortableItem: FC<PropsType> = ({ id, children }: PropsType) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

	const style = { transform: CSS.Transform.toString(transform), transition }

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	)
}

export default SortableItem
