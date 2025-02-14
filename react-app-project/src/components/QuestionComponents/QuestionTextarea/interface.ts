/**
 * @description QuestionTextarea 输入框组件属性类型
 */
export type QuestionTextareaPropsType = {
	title?: string
	placeholder?: string
	// 用于 PropComponent 属性表单
	onChange?: (newProps: QuestionTextareaPropsType) => void
	disabled?: boolean
}

/**
 * @description QuestionTextarea 输入框组件默认属性
 */
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
	title: '输入框标题',
	placeholder: '请输入...'
}
