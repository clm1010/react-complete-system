import { configureStore } from '@reduxjs/toolkit'
import useReducer, { UserStateType } from './useReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index'

export type StateType = {
	user: UserStateType
	components: ComponentsStateType
}

export default configureStore({
	reducer: {
		user: useReducer, // 用户信息
		components: componentsReducer // 组件信息

		// 分模块, 扩展：问卷信息
	}
})
