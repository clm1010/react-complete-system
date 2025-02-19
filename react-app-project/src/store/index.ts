import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import countReducer from './count'
import todoListReducer, { TodoItemType } from './todolist'

export type StateType = {
	count: number
	todoList: StateWithHistory<TodoItemType[]>
}

export default configureStore({
	reducer: {
		count: countReducer, // 没有加 undo 的，不会受到影响

		// 没有 undo redo
		// todoList: todoListReducer

		// 加了 undo
		todoList: undoable(todoListReducer, {
			limit: 20, // 限制撤销 20 步
			filter: excludeAction(['todoList/toggleCompleted']) // 屏蔽某些 action , 不进行撤销/重做 记录
		})

		// 扩展其他模块
	}
})
