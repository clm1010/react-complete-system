import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './interface'

export * from './interface'

/**
 * @description QuestionTextarea 输入框组件配置
 */
export default {
	title: '多行输入框',
	type: 'questionTextarea', // 要和后端统一好
	Component, // 画布显示的组件
	PropComponent, // 属性组件，修改属性使用
	defaultProps: QuestionTextareaDefaultProps
}
