/**
 * @description QuestionInfo 属性类型
 */
export type QuestionInfoPropsType = {
	title?: string // 问题标题
	desc?: string // 问题描述
	// 用于 PropComponent 属性表单
	onChange?: (newProps: QuestionInfoPropsType) => void
	disabled?: boolean
}

/**
 * @description QuestionInfo 默认属性
 */
export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
	title: '问题标题',
	desc: '问题描述'
}
