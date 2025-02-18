import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * @description 获取下一个选中组件的selectedId
 * @param fe_id 当前选中的组件id
 * @param componentList 组件列表
 */
export function getNextSelectedId(selectedId: string, componentList: ComponentInfoType[]) {
	// 过滤掉隐藏的
	const visibleComponentList = componentList.filter((c) => !c.isHidden)

	// 找到当前选中的组件在列表中的索引
	const index = visibleComponentList.findIndex((c) => c.fe_id === selectedId)
	if (index < 0) return ''

	// 重新计算 selectedId
	let newSelectedId = ''
	const length = visibleComponentList.length
	if (length <= 1) {
		// 组件长度只有一个，被删除了，就没有组件
		newSelectedId = ''
	} else {
		// 组件长度 > 1 个
		if (index + 1 === length) {
			// 要删除最后一个，就要选中上一个
			newSelectedId = visibleComponentList[index - 1].fe_id
		} else {
			// 要删除的不是最后一个，删除以后，就选中下一个
			newSelectedId = visibleComponentList[index + 1].fe_id
		}
	}
	return newSelectedId
}

// /**
//  * @description 插入新组件
//  * @param draft 组件列表
//  * @param newComponent 新组件
//  */
// export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
// 	const { selectedId, componentList } = draft
// 	const index = componentList.findIndex((c) => c.fe_id === selectedId)

// 	// 未选中任何组件，就添加到最后一个
// 	if (index < 0) {
// 		draft.componentList.push(newComponent)
// 	} else {
// 		// 选中了组件，就插入到 index 后面
// 		draft.componentList.splice(index + 1, 0, newComponent)
// 	}
// 	// 添加后重新设置 selectedId，自动选中
// 	draft.selectedId = newComponent.fe_id
// }

/**
 * @description 插入新组件
 * @param state 组件列表
 * @param newComponent 新组件
 * @description reduxjs/toolkit 2.0 版本, 内置了 immer, 会自动处理不可变数据, 可以不使用 produce
 */
export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
	const { selectedId, componentList } = state
	const index = componentList.findIndex((c) => c.fe_id === selectedId)

	// 未选中任何组件，就添加到最后一个
	if (index < 0) {
		state.componentList.push(newComponent)
	} else {
		// 选中了组件，就插入到 index 后面
		state.componentList.splice(index + 1, 0, newComponent)
	}
	// 添加后重新设置 selectedId，自动选中
	state.selectedId = newComponent.fe_id
}
