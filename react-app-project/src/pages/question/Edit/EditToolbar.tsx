import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Space, Tooltip } from 'antd'
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	CopyOutlined,
	BlockOutlined
} from '@ant-design/icons'
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
	copySelectedComponent,
	pasteCopiedComponent
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()

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

	// 复制组件
	const handlerCopy = () => {
		// 复制选中的组件
		dispatch(copySelectedComponent())
	}

	// 粘贴组件
	const handlerPaste = () => {
		// 粘贴选中的组件
		dispatch(pasteCopiedComponent())
	}

	//TODO 上移/下移，撤销/重做

	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handlerDelete}></Button>
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handlerHidden}></Button>
			</Tooltip>
			<Tooltip title={isLocked ? '解锁' : '锁定'}>
				<Button
					shape="circle"
					icon={<LockOutlined />}
					onClick={handlerLock}
					type={isLocked ? 'primary' : 'default'}
				></Button>
			</Tooltip>
			<Tooltip title="复制">
				<Button shape="circle" icon={<CopyOutlined />} onClick={handlerCopy}></Button>
			</Tooltip>
			<Tooltip title="粘贴">
				<Button
					shape="circle"
					icon={<BlockOutlined />}
					onClick={handlerPaste}
					disabled={copiedComponent == null}
				></Button>
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
