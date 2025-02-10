import Component from './Component'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

/**
 * @description QuestionInput 输入框组件配置
 */
export default {
	title: '输入框',
	type: 'questionInput', // 要和后端统一好
	Component,
	defaultProps: QuestionInputDefaultProps
}
