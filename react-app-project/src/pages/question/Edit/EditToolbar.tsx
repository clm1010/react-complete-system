import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Space, Tooltip } from 'antd'
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	CopyOutlined,
	BlockOutlined,
	UpOutlined,
	DownOutlined
} from '@ant-design/icons'
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
	copySelectedComponent,
	pasteCopiedComponent,
	moveComponent
} from '../../../store/componentsReducer/index'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
	const { isLocked } = selectedComponent || {}
	const length = componentList.length // 组件长度
	const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId) // 选中组件的索引
	const isFirst = selectedIndex <= 0 // 是第一个
	const isLast = selectedIndex + 1 >= length // 是最后一个

	// 删除组件
	const handleDelete = () => {
		// 删除选中的组件
		dispatch(removeSelectedComponent())
	}

	// 隐藏组件
	const handleHidden = () => {
		// 隐藏选中的组件
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
	}

	// 锁定组件
	const handleLock = () => {
		// 锁定选中的组件
		dispatch(toggleComponentLock({ fe_id: selectedId }))
	}

	// 复制组件
	const handleCopy = () => {
		// 复制选中的组件
		dispatch(copySelectedComponent())
	}

	// 粘贴组件
	const handlePaste = () => {
		// 粘贴选中的组件
		dispatch(pasteCopiedComponent())
	}

	//TODO 上移/下移，撤销/重做
	// 上移组件
	const handleMoveUp = () => {
		if (isFirst) return // 已经是第一个了，不需要上移
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
	}

	// 下移组件
	const handleMoveDown = () => {
		if (isLast) return // 已经是最后一个了，不需要下移
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
	}

	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
			</Tooltip>
			<Tooltip title={isLocked ? '解锁' : '锁定'}>
				<Button
					shape="circle"
					icon={<LockOutlined />}
					onClick={handleLock}
					type={isLocked ? 'primary' : 'default'}
				></Button>
			</Tooltip>
			<Tooltip title="复制">
				<Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
			</Tooltip>
			<Tooltip title="粘贴">
				<Button
					shape="circle"
					icon={<BlockOutlined />}
					onClick={handlePaste}
					disabled={copiedComponent == null}
				></Button>
			</Tooltip>
			<Tooltip title="上移">
				<Button
					shape="circle"
					icon={<UpOutlined />}
					onClick={handleMoveUp}
					disabled={isFirst}
				></Button>
			</Tooltip>
			<Tooltip title="下移">
				<Button
					shape="circle"
					icon={<DownOutlined />}
					onClick={handleMoveDown}
					disabled={isLast}
				></Button>
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
