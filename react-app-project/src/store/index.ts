import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import useReducer, { UserStateType } from './useReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
	user: UserStateType
	// components: ComponentsStateType
	components: StateWithHistory<ComponentsStateType> // 增加了 undo
	pageInfo: PageInfoType
}

export default configureStore({
	reducer: {
		// 用户信息
		user: useReducer, // 没有加 undo 的，不会受到影响
		// 没有 undo
		// components: componentsReducer, // 组件信息

		// 组件信息
		// 增加了 undo
		components: undoable(componentsReducer, {
			limit: 20, // 限制撤销 20 步
			filter: excludeAction([
				'components/resetComponents',
				'components/changeSelectedId',
				'components/selectPrevComponent',
				'components/selectNextComponent'
			]) // 屏蔽某些 action , 不进行撤销/重做 记录
		}),

		// 页面信息
		pageInfo: pageInfoReducer // 没有加 undo 的，不会受到影响

		// 分模块, 扩展：问卷信息
	}
})
