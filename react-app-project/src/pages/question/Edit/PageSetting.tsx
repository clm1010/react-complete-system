import type { FC } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
	const pageInfo = useGetPageInfo()
	// const { title, desc, js, css } = pageInfo
	const [form] = Form.useForm()
	const dispatch = useDispatch()

	// 实时更新表单内容
	useEffect(() => {
		form.setFieldsValue(pageInfo)
	}, [pageInfo])

	// 表单项值发生变化时的回调
	const handlerValuesChange = () => {
		dispatch(resetPageInfo(form.getFieldsValue()))
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={pageInfo}
			onValuesChange={handlerValuesChange}
		>
			<Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input placeholder="请输入标题" />
			</Form.Item>
			<Form.Item label="问卷描述" name="desc">
				<TextArea placeholder="请输入描述" />
			</Form.Item>
			<Form.Item label="JS" name="js">
				<TextArea placeholder="请输入 JS 脚本代码..." />
			</Form.Item>
			<Form.Item label="CSS" name="css">
				<TextArea placeholder="请输入 CSS 样式代码..." />
			</Form.Item>
		</Form>
	)
}

export default PageSetting
