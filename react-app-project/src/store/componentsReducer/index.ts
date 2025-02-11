// 存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
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
	selectedId: string
	componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
	selectedId: '',
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
		},

		// 修改 selectedId, 使用 immer 进行处理  react state 不可变数据写法，使用 immer 就不用顾虑 返回新的 state
		changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
			draft.selectedId = action.payload
		}),

		// 添加新组建
		addComponent: produce(
			(draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
				const newComponent = action.payload
				const { selectedId, componentList } = draft
				const index = componentList.findIndex((c) => c.fe_id === selectedId)

				// 未选中任何组件，就添加到最后一个
				if (index < 0) {
					draft.componentList.push(newComponent)
				} else {
					// 选中了组件，就插入到 index 后面
					draft.componentList.splice(index + 1, 0, newComponent)
				}
				// 添加后重新设置 selectedId，自动选中
				draft.selectedId = newComponent.fe_id
			}
		)
	}
})

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions

export default componentsSlice.reducer
