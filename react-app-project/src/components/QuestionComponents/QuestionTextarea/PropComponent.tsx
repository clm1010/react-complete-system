import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import type { QuestionTextareaPropsType } from './interface'

/**
 * @description QuestionTextarea 属性组件设置
 * @param props QuestionTextareaPropsType
 */
const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
	const { title, placeholder, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听 title 和 placeholder 变化，更新表单
	useEffect(() => {
		form.setFieldsValue({ title, placeholder })
	}, [title, placeholder])

	// 表单值变化
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
			initialValues={{ title, placeholder }}
			onValuesChange={handlerValuesChange}
			disabled={disabled}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="placeholder" name="placeholder">
				<Input />
			</Form.Item>
		</Form>
	)
}

export default PropComponent
