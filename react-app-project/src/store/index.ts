import { configureStore } from '@reduxjs/toolkit'
import useReducer, { UserStateType } from './useReducer'

export type StateType = {
	user: UserStateType
}

export default configureStore({
	reducer: {
		user: useReducer

		// 分模块, 扩展：问卷信息
	}
})
