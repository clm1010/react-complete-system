import { useSelector } from 'react-redux'
import { StateType } from '../store/index'
import { ComponentsStateType } from '../store/componentsReducer/index'

/**
 * @description 获取组件信息
 * @returns componentList 组件列表
 */
const useGetComponentInfo = () => {
	const components = useSelector<StateType>((state) => state.components) as ComponentsStateType
	const { componentList = [], selectedId } = components

	return {
		componentList,
		selectedId
	}
}

export default useGetComponentInfo
