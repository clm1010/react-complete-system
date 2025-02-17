import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import type { QuestionInfoPropsType } from './interface'

const { TextArea } = Input

/**
 * @description QuestionInfo 属性组件设置
 * @param props QuestionInfoPropsType
 */
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
	const { title, desc, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听 form 表单变化，更新 text、desc
	useEffect(() => {
		form.setFieldsValue({ title, desc })
	}, [title, desc])

	// 表单项值发生变化时的回调
	const handlerValuesChange = () => {
		// 如果有 onChange 回调，则执行
		if (onChange) {
			onChange(form.getFieldsValue())
		}
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ title, desc }}
			onValuesChange={handlerValuesChange}
			disabled={disabled}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="描述" name="desc">
				<TextArea rows={8} placeholder="请输入描述内容" />
			</Form.Item>
		</Form>
	)
}

export default PropComponent
