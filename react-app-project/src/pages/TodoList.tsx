import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { ActionCreators } from 'redux-undo'
import type { StateType } from '../store/index'
import type { TodoItemType } from '../store/todolist'
import { addTodo, removeTodo, toggleCompleted } from '../store/todolist'

export const TodoList: FC = () => {
	// 从 redux store 中获取 todoList
	const todoList = useSelector<StateType>((state) => state.todoList.present) as TodoItemType[]

	const dispatch = useDispatch()

	// 删除
	const handleDel = (id: string) => {
		dispatch(removeTodo({ id }))
	}

	// 切换
	const handleToggle = (id: string) => {
		dispatch(toggleCompleted({ id }))
	}

	// 添加
	const handleAdd = () => {
		const id = nanoid(5)
		const newTodo = { id, title: `todo-${id}`, completed: false }
		dispatch(addTodo(newTodo))
	}

	// 撤销
	const handleUndo = () => {
		dispatch(ActionCreators.undo())
	}

	// 重做
	const handleRedo = () => {
		dispatch(ActionCreators.redo())
	}

	return (
		<>
			<p>TodoList</p>
			<div>
				<button onClick={handleAdd}>添加</button>
			</div>
			<ul>
				{todoList.map((todo) => {
					const { id, title, completed } = todo
					return (
						<li key={id} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
							<span style={{ cursor: 'pointer' }} onClick={() => handleToggle(id)}>
								{title}
							</span>
							&nbsp;&nbsp;
							<button onClick={() => handleDel(id)}>删除</button>
						</li>
					)
				})}
			</ul>
			<div>
				<button onClick={handleUndo}>撤销/undo</button>
				<button onClick={handleRedo}>重做/redo</button>
			</div>
		</>
	)
}

export default TodoList
