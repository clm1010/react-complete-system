import type { FC, ChangeEvent } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { message, Input, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
	changeSelectedId,
	changeComponentTitle,
	changeComponentHidden,
	toggleComponentLock
} from '../../../store/componentsReducer'
import styles from './Layers.module.scss'

const Layers: FC = () => {
	const { componentList, selectedId } = useGetComponentInfo()
	const dispatch = useDispatch()

	// 记录当前正在修改标题的组件
	const [changingTitleId, setChangingTitleId] = useState('')

	// 点击选中组件
	const handleClick = (fe_id: string) => {
		const curComp = componentList.find((c) => c.fe_id === fe_id)
		if (curComp && curComp.isHidden) {
			message.info('不能选中隐藏的组件')
			return
		}

		if (fe_id !== selectedId) {
			// 当前组件未被选中，执行选中
			dispatch(changeSelectedId(fe_id))
			setChangingTitleId('')
			return
		}

		// 点击修改标题
		setChangingTitleId(fe_id)
	}

	// 修改标题
	const handlerChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value.trim()
		if (!newTitle) return
		if (!selectedId) return
		dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
	}

	// 切换 隐藏/显示
	const handlerChangeHidden = (fe_id: string, isHidden: boolean) => {
		// 如果要隐藏的组件正在被选中，则取消选中
		dispatch(changeComponentHidden({ fe_id, isHidden }))
	}

	// 切换 锁定/解锁
	const handlerChangeLocked = (fe_id: string) => {
		dispatch(toggleComponentLock({ fe_id }))
	}
	return (
		<>
			{componentList.map((c) => {
				const { fe_id, title, isHidden, isLocked } = c

				// 拼接 title className
				const titleDefaultClassName = styles.title
				const selectedClassName = styles.selected
				const titleClassName = classNames({
					[titleDefaultClassName]: true,
					[selectedClassName]: fe_id === selectedId
				})

				return (
					<div key={fe_id} className={styles.wrapper}>
						<div className={titleClassName} onClick={() => handleClick(fe_id)}>
							{fe_id === changingTitleId && (
								<Input
									value={title}
									onChange={handlerChangeTitle}
									onPressEnter={() => setChangingTitleId('')}
									onBlur={() => setChangingTitleId('')}
								/>
							)}
							{fe_id !== changingTitleId && title}
						</div>
						<div className={styles.handler}>
							<Space>
								<Button
									size="small"
									shape="circle"
									className={!isHidden ? styles.btn : ''}
									icon={<EyeInvisibleOutlined />}
									type={isHidden ? 'primary' : 'text'}
									onClick={() => handlerChangeHidden(fe_id, !isHidden)}
								/>
								<Button
									size="small"
									shape="circle"
									className={!isLocked ? styles.btn : ''}
									icon={<LockOutlined />}
									type={isLocked ? 'primary' : 'text'}
									onClick={() => handlerChangeLocked(fe_id)}
								/>
							</Space>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default Layers
