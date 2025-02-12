import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
	getComponentConfByType,
	ComponentPropsType
} from '../../../components/QuestionComponents/index'
import { changeComponentProps } from '../../../store/componentsReducer/index'

// 未选中组件
const NoProp: FC = () => {
	return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

/**
 * @description 组件属性
 * @returns ComponentProp 组件
 */
const ComponentProp: FC = () => {
	const dispatch = useDispatch()

	// redux store 中的当前选中的组件
	const { selectedComponent } = useGetComponentInfo()
	// 如果没有选中组件，就返回未选中组件
	if (selectedComponent == null) return <NoProp />

	const { type, props, isLocked, isHidden } = selectedComponent
	// 根据 type 获取配置
	const componentConf = getComponentConfByType(type)
	// 如果没有配置，就返回未选中组件
	if (componentConf == null) return <NoProp />

	const changeProps = (newProps: ComponentPropsType) => {
		if (selectedComponent == null) return
		const { fe_id } = selectedComponent
		// 更新组件
		dispatch(changeComponentProps({ fe_id, newProps }))
	}

	const { PropComponent } = componentConf

	return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp
