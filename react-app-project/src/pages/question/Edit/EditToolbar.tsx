import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { removeSelectedComponent } from '../../../store/componentsReducer'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()

	// 删除
	const handlerDelete = () => {
		// 删除选中的组件
		dispatch(removeSelectedComponent())
	}

	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handlerDelete}></Button>
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
