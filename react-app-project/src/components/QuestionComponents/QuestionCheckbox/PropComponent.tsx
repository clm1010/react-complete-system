import type { FC } from 'react'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import type { QuestionCheckboxPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
	const { title, isVertical, list = [], onChange, disabled } = props
	const [form] = Form.useForm()

	// 表单项值发生变化时的回调
	useEffect(() => {
		form.setFieldsValue({ title, isVertical, list })
	}, [title, isVertical, list])

	// 监听表单变化，更新 props
	const handlerValuesChange = () => {
		if (onChange == null) return

		// 如果有 onChange 回调，则执行
		const newValues = form.getFieldsValue() as QuestionCheckboxPropsType // 获取所有表单项的值

		if (newValues.list) {
			// 过滤掉 text 是 undefined 的选项
			newValues.list = newValues.list.filter((opt: OptionType) => !(opt.text == null))
		}

		const { list = [] } = newValues

		list.forEach((opt: OptionType) => {
			if (opt.value) return
			opt.value = nanoid(5) // 补齐 option 的  value 值
		})

		onChange(newValues) // 执行回调
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ title, isVertical, list }}
			disabled={disabled}
			onValuesChange={handlerValuesChange}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="list">
					{(fields, { add, remove }) => (
						<>
							{/* 遍历所有的选项（可删除） */}
							{/* item 可以解构 出 key、name、fieldKey、isListField */}
							{fields.map(({ key, name }, index) => {
								return (
									<Space key={key} align="baseline">
										{/* 当前选项 是否选中 */}
										<Form.Item name={[name, 'checked']} valuePropName="checked">
											<Checkbox />
										</Form.Item>
										{/* 当前选项 输入框 */}
										<Form.Item
											name={[name, 'text']}
											rules={[
												{ required: true, message: '请输入选项标题' },
												// 自定义校验 规则
												{
													validator: (_, text) => {
														const { list = [] } = form.getFieldsValue() // 获取所有表单项的值
														let num = 0
														list.forEach((opt: OptionType) => {
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
										{index > 0 && (
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
									onClick={() => add({ text: '', value: '', checked: false })}
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
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	)
}
export default PropComponent
