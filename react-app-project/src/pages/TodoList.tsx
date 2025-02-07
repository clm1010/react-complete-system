import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import type { StateType } from '../store/index'
import type { TodoItemType } from '../store/todolist'
import { addTodo, removeTodo, toggleCompleted } from '../store/todolist'

export const TodoList: FC = () => {
	const todoList = useSelector<StateType>((state) => state.todoList) as TodoItemType[]

	const dispatch = useDispatch()

	// 删除
	const handlerDel = (id: string) => {
		dispatch(removeTodo({ id }))
	}

	// 切换
	const handlerToggle = (id: string) => {
		dispatch(toggleCompleted({ id }))
	}

	// 添加
	const handlerAdd = () => {
		const id = nanoid(5)
		const newTodo = { id, title: `todo-${id}`, completed: false }
		dispatch(addTodo(newTodo))
	}

	return (
		<>
			<p>TodoList</p>
			<div>
				<button onClick={handlerAdd}>添加</button>
			</div>
			<ul>
				{todoList.map((todo) => {
					const { id, title, completed } = todo
					return (
						<li key={id} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
							<span style={{ cursor: 'pointer' }} onClick={() => handlerToggle(id)}>
								{title}
							</span>
							&nbsp;&nbsp;
							<button onClick={() => handlerDel(id)}>删除</button>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default TodoList
