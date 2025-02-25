/**
 * @description Radio 选项类型
 */
export type OptionType = {
	value: string
	text: string
}

/**
 * @description QuestionRadio 属性类型
 */
export type QuestionRadioPropsType = {
	title?: string
	isVertical?: boolean // 是否垂直排列
	options?: OptionType[] // 选项
	value?: string // 当前选中的值
	// 用于 PropComponent 属性表单
	onChange?: (newProps: QuestionRadioPropsType) => void
	disabled?: boolean
}

/**
 * @description QuestionRadio 默认属性
 */
export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
	title: '单选标题',
	isVertical: false,
	options: [
		{ value: 'item1', text: '选项1' },
		{ value: 'item2', text: '选项2' },
		{ value: 'item3', text: '选项3' }
	],
	value: ''
}

/**
 * @description QuestionRadioStatPropsType 统计组件的属性类型
 */
export type QuestionRadioStatPropsType = {
	stat: Array<{ name: string; count: number }>
}
