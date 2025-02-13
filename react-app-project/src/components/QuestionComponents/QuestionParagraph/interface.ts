/**
 * @description QuestionParagraph 属性类型
 */
export type QuestionParagraphPropsType = {
	text?: string
	isCenter?: boolean
	// 用于 PropComponent 属性表单
	onChange?: (newProps: QuestionParagraphPropsType) => void
	disabled?: boolean
}

/**
 * @description QuestionParagraph 默认属性
 */
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
	text: '一行段落',
	isCenter: false
}
