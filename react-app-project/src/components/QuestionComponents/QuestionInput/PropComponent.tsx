import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './interface'

/**
 * @description QuestionInput 属性组件设置
 * @param props QuestionInputPropsType
 */
const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
	const { title, placeholder, onChange } = props
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
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Placeholder" name="placeholder">
				<Input />
			</Form.Item>
		</Form>
	)
}

export default PropComponent
