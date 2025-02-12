import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent } = useGetComponentInfo()

	const { isLocked } = selectedComponent || {}

	// 删除组件
	const handlerDelete = () => {
		// 删除选中的组件
		dispatch(removeSelectedComponent())
	}

	// 隐藏组件
	const handlerHidden = () => {
		// 隐藏选中的组件
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
	}

	// 锁定组件
	const handlerLock = () => {
		// 锁定选中的组件
		dispatch(toggleComponentLock({ fe_id: selectedId }))
	}

	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handlerDelete}></Button>
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handlerHidden}></Button>
			</Tooltip>
			<Tooltip title="锁定">
				<Button
					shape="circle"
					icon={<LockOutlined />}
					onClick={handlerLock}
					type={isLocked ? 'primary' : 'default'}
				></Button>
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
