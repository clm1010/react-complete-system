/**
 * @description QuestionInputPropsType 属性
 */
export type QuestionInputPropsType = {
	title?: string
	placeholder?: string
	onChange?: (newProps: QuestionInputPropsType) => void
}

// 默认属性
export const QuestionInputDefaultProps: QuestionInputPropsType = {
	title: '输入框标题',
	placeholder: '请输入...'
}
