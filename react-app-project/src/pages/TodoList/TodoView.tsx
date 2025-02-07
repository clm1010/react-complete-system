import type { FC } from 'react'
import { observer } from 'mobx-react'
import { ObservableTodoStore } from '../../store'

type PropsType = {
	todo: ObservableTodoStore
	del: (id: string) => void
}

const TodoView: FC<PropsType> = observer((props: PropsType) => {
	const { todo, del } = props

	const handlerRename = () => {
		const newName = prompt('重新输入名称', todo.task)
		if (newName) {
			todo.rename(newName)
		}
	}

	const toggleCompletedChange = () => {
		todo.toggleCompleted()
	}

	return (
		<li onDoubleClick={handlerRename}>
			<input type="checkbox" checked={todo.completed} onChange={toggleCompletedChange} />
			<span style={{ cursor: 'pointer', textDecoration: todo.completed ? 'line-through' : '' }}>
				{todo.task}
			</span>
			<button onClick={() => del(todo.id)}>删除</button>
		</li>
	)
})

export default TodoView
