/**
 * @description QuestionTitle 属性类型
 */
export type QuestionTitlePropsType = {
	text?: string
	level?: 1 | 2 | 3 | 4 | 5
	isCenter?: boolean
	// 用于 PropComponent 属性表单
	onChange?: (newProps: QuestionTitlePropsType) => void
	disabled?: boolean
}

/**
 * @description QuestionTitle默认属性
 */
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
	text: '一行标题',
	level: 1,
	isCenter: false
}
