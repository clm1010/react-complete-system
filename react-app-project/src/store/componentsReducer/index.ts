// 存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { ComponentPropsType } from '../../components/QuestionComponents/index'
import { getNextSelectedId, insertNewComponent } from './utils'

/**
 * @description 组件信息
 */
export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	isHidden?: boolean
	isLocked?: boolean
	props: ComponentPropsType
}

export type ComponentsStateType = {
	selectedId: string
	componentList: Array<ComponentInfoType>
	copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
	selectedId: '',
	componentList: [],
	copiedComponent: null
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
				insertNewComponent(draft, newComponent)
			}
		),

		// 添加新组建 @reduxjs/toolkit 2.0 版本, 内置了 immer
		// addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
		// 	const newComponent = action.payload
		// 	insertNewComponent(state, newComponent)
		// },

		// 修改组件属性
		changeComponentProps: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
			) => {
				const { fe_id, newProps } = action.payload
				// 找到要修改的组件
				const curComp = draft.componentList.find((c) => c.fe_id === fe_id)
				if (curComp) {
					curComp.props = {
						...curComp.props,
						...newProps
					}
				}
			}
		),

		// 删除选中的组件
		removeSelectedComponent: produce((draft: ComponentsStateType) => {
			const { selectedId: removeId, componentList = [] } = draft

			// 重新计算 selectedId
			const newSelectedId = getNextSelectedId(removeId, componentList)
			draft.selectedId = newSelectedId

			// 找到要删除的组件
			const index = componentList.findIndex((c) => c.fe_id === removeId)
			componentList.splice(index, 1)
		}),

		// 隐藏/显示 组件
		changeComponentHidden: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
				const { componentList = [] } = draft
				const { fe_id, isHidden } = action.payload

				// 重新计算 selectedId
				let newSelectedId = ''
				if (isHidden) {
					// 要隐藏
					newSelectedId = getNextSelectedId(fe_id, componentList)
				} else {
					// 要显示
					newSelectedId = fe_id
				}
				draft.selectedId = newSelectedId

				// 找到要隐藏的组件
				const curComp = componentList.find((c) => c.fe_id === fe_id)
				if (curComp) {
					curComp.isHidden = isHidden
				}
			}
		),

		// 锁定/解锁 组件
		toggleComponentLock: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
				const { componentList = [] } = draft
				const { fe_id } = action.payload

				// 找到要锁定的组件
				const curComp = componentList.find((c) => c.fe_id === fe_id)
				if (curComp) {
					curComp.isLocked = !curComp.isLocked
				}
			}
		),

		// 拷贝当前选中的组件
		copySelectedComponent: produce((draft: ComponentsStateType) => {
			const { selectedId: copySelectedId, componentList = [] } = draft

			// 找到要拷贝的组件
			const selectedComponent = componentList.find((c) => c.fe_id === copySelectedId)
			if (selectedComponent == null) return

			// 使用 lodash.clonedeep 进行深拷贝组件
			draft.copiedComponent = cloneDeep(selectedComponent)
		}),

		// 粘贴组件
		pasteCopiedComponent: produce((draft: ComponentsStateType) => {
			const { copiedComponent } = draft
			if (copiedComponent == null) return

			// 要把 fe_id 给修改了，id 不能重复 重要！！！
			copiedComponent.fe_id = nanoid()
			// 插入 copiedComponent 到 componentList 中
			insertNewComponent(draft, copiedComponent)
		}),

		// 选中上一个
		selectPrevComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)

			if (selectedIndex < 0) return // 说明 未选中组件

			if (selectedIndex <= 0) return // 说明 已无法向上选中，已选中第一个

			draft.selectedId = componentList[selectedIndex - 1].fe_id // 选中上一个, selectedIndex - 1 就是上一个
		}),

		// 选中下一个
		selectNextComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)

			if (selectedIndex < 0) return // 说明 未选中组件
			if (selectedIndex + 1 === componentList.length) return // 说明 已无法向下选中，已选中最后一个

			draft.selectedId = componentList[selectedIndex + 1].fe_id // 选中下一个, selectedIndex + 1 就是下一个
		}),

		// 修改组件标题
		changeComponentTitle: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
				const { fe_id, title } = action.payload
				const curComp = draft.componentList.find((c) => c.fe_id === fe_id)
				if (curComp) curComp.title = title
			}
		)
	}
})

export const {
	resetComponents,
	changeSelectedId,
	addComponent,
	changeComponentProps,
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent,
	changeComponentTitle
} = componentsSlice.actions

export default componentsSlice.reducer
