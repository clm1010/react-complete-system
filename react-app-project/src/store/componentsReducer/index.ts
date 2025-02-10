// 存储组件列表数据

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents/index'

/**
 * @description 组件信息
 */
export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	props: ComponentPropsType
}

export type ComponentsStateType = {
	componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
	componentList: []
	// 其他扩展
}

/**
 * @description 组件列表 slice
 */
export const componentsSlice = createSlice({
	name: 'components',
	initialState: INIT_STATE,
	reducers: {
		// 重置所有组件
		resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
			return action.payload
		}
	}
})

export const { resetComponents } = componentsSlice.actions

export default componentsSlice.reducer
