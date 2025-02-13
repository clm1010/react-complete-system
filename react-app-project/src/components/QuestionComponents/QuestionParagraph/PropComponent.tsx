import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
	const { text, isCenter, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听 text、isCenter 变化，更新表单
	useEffect(() => {
		form.setFieldsValue({ text, isCenter })
	}, [text, isCenter])

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
			initialValues={{ text, isCenter }}
			onValuesChange={handlerValuesChange}
			disabled={disabled}
		>
			<Form.Item
				label="段落内容"
				name="text"
				rules={[{ required: true, message: '请输入段落内容' }]}
			>
				<TextArea rows={3} placeholder="请输入段落内容" />
			</Form.Item>
			<Form.Item name="isCenter" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default PropComponent
