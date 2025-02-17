import type { FC } from 'react'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import type { QuestionRadioPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
	const { title, isVertical, options = [], value, onChange, disabled } = props
	const [form] = Form.useForm()

	// 监听 text、isVertical、options、value 变化，更新表单
	useEffect(() => {
		form.setFieldsValue({ title, isVertical, options, value })
	}, [title, isVertical, options, value])

	// 监听表单变化，更新 props
	const handlerValuesChange = () => {
		if (onChange == null) return

		// 如果有 onChange 回调，则执行
		const newValues = form.getFieldsValue() as QuestionRadioPropsType // 获取所有表单项的值

		if (newValues.options) {
			// 过滤掉 text 是 undefined 的选项
			newValues.options = newValues.options.filter((opt: OptionType) => !(opt.text == null))
		}

		const { options = [] } = newValues

		options.forEach((opt: OptionType) => {
			if (opt.value) return
			opt.value = nanoid(5) // 补齐 option 的  value 值
		})

		onChange(newValues)
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ title, isVertical, options, value }}
			onValuesChange={handlerValuesChange}
			disabled={disabled}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							{/* 遍历所有的选项（可删除） */}
							{/* item 可以解构 出 key、name、fieldKey、isListField */}
							{fields.map(({ key, name }, index) => {
								return (
									<Space key={key} align="baseline">
										{/* 当前选项 输入框 */}
										<Form.Item
											name={[name, 'text']}
											rules={[
												{ required: true, message: '请输入选项标题' },
												// 自定义校验 规则
												{
													validator: (_, text) => {
														const { options = [] } = form.getFieldsValue() // 获取所有表单项的值
														let num = 0
														options.forEach((opt: OptionType) => {
															if (opt.text === text) num++ // 记录 text 相同的个数，预期只有1个
														})

														if (num === 1) return Promise.resolve()
														return Promise.reject(new Error('和其他选项不能重复！'))
													}
												}
											]}
										>
											<Input placeholder="输入选项标题..." />
										</Form.Item>
										{/* 当前选项 删除按钮 */}
										{index > 1 && (
											<MinusCircleOutlined
												style={{ color: 'red' }}
												onClick={() => remove(name)}
											></MinusCircleOutlined>
										)}
									</Space>
								)
							})}
							{/* 添加选项 */}
							<Form.Item>
								<Button
									type="dashed"
									style={{ color: '#1677ff' }}
									onClick={() => add({ text: '', value: '' })}
									icon={<PlusOutlined />}
									block
								>
									添加选项
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form.Item>
			<Form.Item label="默认选中" name="value">
				<Select
					value={value}
					options={options.map(({ text, value }) => ({ label: text || '', value: value }))}
				></Select>
			</Form.Item>
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default PropComponent
