import type { FC, ChangeEvent } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography, Space, Input, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { LeftOutlined, SaveOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { updateQuestionService } from '../../../services/question'
import styles from './EditHeader.module.scss'

const { Title } = Typography

/**
 * @description 显示和修改标题
 * @returns Title
 */
const TitleElem: FC = () => {
	const dispatch = useDispatch()
	const { title } = useGetPageInfo()
	const [editState, setEditState] = useState(false)

	// 修改标题
	const handlerChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value.trim()
		if (!newTitle) return
		dispatch(changePageTitle(newTitle))
	}

	if (editState) {
		return (
			<Input
				value={title}
				autoFocus
				onChange={handlerChangeTitle}
				onBlur={() => setEditState(false)}
				onPressEnter={() => setEditState(false)}
			/>
		)
	}

	return (
		<Space>
			<Title level={5} style={{ margin: 0 }}>
				{title}
			</Title>
			<Button type="text" icon={<EditOutlined />} onClick={() => setEditState(true)} />
		</Space>
	)
}

/**
 * @description 保存按钮
 * @returns Button
 */
const SaveButton: FC = () => {
	const { id } = useParams()
	const { componentList } = useGetComponentInfo()
	const pageInfo = useGetPageInfo()

	const { loading: saveLoading, run: saveRun } = useRequest(
		async () => {
			if (!id) return
			await updateQuestionService(id, { ...pageInfo, componentList })
		},
		{ manual: true }
	)

	// 快捷键保存
	useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
		event.preventDefault()
		if (!saveLoading) saveRun()
	})

	// 自动保存 (不是定时保存，不是定期保存)
	// 使用 ahooks useDebounceEffect 防抖监听
	useDebounceEffect(
		() => {
			saveRun()
		},
		[componentList, pageInfo],
		{ wait: 1000 }
	)

	return (
		<Button loading={saveLoading} icon={<SaveOutlined />} onClick={saveRun}>
			保存
		</Button>
	)
}

/**
 * @description 发布按钮
 * @returns Button
 */
const PublishButton: FC = () => {
	const nav = useNavigate()
	const { id } = useParams()
	const { componentList } = useGetComponentInfo()
	const pageInfo = useGetPageInfo()

	const { loading: publishLoading, run: publishRun } = useRequest(
		async () => {
			if (!id) return
			// isPublished: true 标志着已经被发布
			await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
		},
		{
			manual: true,
			onSuccess: () => {
				message.success('发布成功')
				nav('/question/stat/' + id) // 发布成功，导航到统计页面
			}
		}
	)

	return (
		<Button loading={publishLoading} type="primary" icon={<ArrowUpOutlined />} onClick={publishRun}>
			发布
		</Button>
	)
}

/**
 * @description 编辑头部
 */
const EditHeader: FC = () => {
	const nav = useNavigate()

	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<TitleElem />
					</Space>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<Space>
						<SaveButton />
						<PublishButton />
					</Space>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
