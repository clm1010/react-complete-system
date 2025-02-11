import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

/**
 * @description QuestionInput 输入框组件配置
 */
export default {
	title: '输入框',
	type: 'questionInput', // 要和后端统一好
	Component, // 画布显示的组件
	PropComponent, // 属性组件，修改属性使用
	defaultProps: QuestionInputDefaultProps
}
