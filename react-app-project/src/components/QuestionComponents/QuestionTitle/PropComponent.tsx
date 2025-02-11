import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import { QuestionTitlePropsType } from './interface'

/**
 * @description QuestionTitle 属性组件设置
 * @param props QuestionInputPropsType
 */
const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
	const { text, level, isCenter } = props
	const [form] = Form.useForm()

	// 监听 text、level、isCenter 变化，更新表单
	useEffect(() => {
		form.setFieldsValue({ text, level, isCenter })
	}, [text, level, isCenter])

	return (
		<Form form={form} layout="vertical" initialValues={{ text, level, isCenter }}>
			<Form.Item
				label="标题内容"
				name="text"
				rules={[{ required: true, message: '请输入标题内容' }]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="层级" name="level">
				<Select
					options={[
						{ value: 1, text: 1 },
						{ value: 2, text: 2 },
						{ value: 3, text: 3 }
					]}
				></Select>
			</Form.Item>
			{/* valuePropName checked 代替 value 属性，因为 Checkbox 没有 value 属性  */}
			<Form.Item name="isCenter" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default PropComponent
