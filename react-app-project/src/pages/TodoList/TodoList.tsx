import type { FC } from 'react'
import { observer } from 'mobx-react'
import { ObservableTodoListStore } from '../../store'
import TodoView from './TodoView'

type PropsType = {
	store: ObservableTodoListStore
}

const TodoList: FC<PropsType> = observer((props: PropsType) => {
	const { store } = props

	const handlerNewTodo = () => {
		const taskName = prompt('请输入一个 todo 名称')
		if (taskName) {
			store.addTodo(taskName)
		}
	}

	const handlerDelete = (id: string) => {
		store.removeTodo(id)
	}

	return (
		<>
			<button onClick={handlerNewTodo}>add todo</button>
			<ul>
				{store.todos.map((todo) => {
					const { id } = todo
					return <TodoView key={id} todo={todo} del={handlerDelete} />
				})}
			</ul>
		</>
	)
})

export default TodoList
