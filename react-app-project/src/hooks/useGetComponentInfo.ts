import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { ComponentsStateType } from '../store/componentsReducer/index'

/**
 * @description 获取组件信息
 * @returns componentList 组件列表
 */
function useGetComponentInfo() {
	// redux store
	// const components = useSelector<StateType>((state) => state.components) as ComponentsStateType

	const components = useSelector<StateType>(
		(state) => state.components.present
	) as ComponentsStateType // 增加了 undo

	const { componentList = [], selectedId, copiedComponent } = components

	// 根据 selectedId 获取当前选中的组件
	const selectedComponent = componentList.find((c) => c.fe_id === selectedId)

	return {
		componentList,
		selectedId,
		selectedComponent,
		copiedComponent
	}
}

export default useGetComponentInfo
