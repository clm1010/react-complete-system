import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

// 数据类型
export type TodoItemType = {
	id: string
	title: string
	completed: boolean // 是否完成
}

// 初始化数据
const INIT_STATE: TodoItemType[] = [
	{ id: nanoid(5), title: '吃饭', completed: false },
	{ id: nanoid(5), title: '睡觉', completed: false }
]

export const todoListSlice = createSlice({
	name: 'todoList',
	initialState: INIT_STATE,
	reducers: {
		// 添加
		addTodo(state: TodoItemType[], action: PayloadAction<TodoItemType>) {
			// return state.concat(action.payload) // 把 newTodo 添加到 list 的最后
			return [
				action.payload, // 把 newTodo 添加到 list 的 第一个
				...state
			]
		},
		// 删除
		removeTodo(state: TodoItemType[], action: PayloadAction<{ id: string }>) {
			const { id: removeId } = action.payload
			return state.filter((todo) => todo.id !== removeId)
		},
		// toggle 切换
		toggleCompleted(state: TodoItemType[], action: PayloadAction<{ id: string }>) {
			// map
			const { id: toggleId } = action.payload
			return state.map((todo) => {
				const { id, completed } = todo
				if (id !== toggleId) return todo
				return { ...todo, completed: !completed }
			})
		}
	}
})

export const { addTodo, removeTodo, toggleCompleted } = todoListSlice.actions

export default todoListSlice.reducer
