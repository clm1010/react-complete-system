export type QuestionTitlePropsType = {
	text?: string
	level?: 1 | 2 | 3 | 4 | 5
	isCenter?: boolean
	onChange?: (newProps: QuestionTitlePropsType) => void
}

/**
 * @description QuestionTitle默认属性
 */
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
	text: '一行标题',
	level: 1,
	isCenter: false
}
