import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

/**
 * @description QuestionTitle 标题组件配置
 */
export default {
	title: '标题',
	type: 'questionTitle', // 要和后端统一好
	Component, // 画布显示的组件
	PropComponent, // 属性组件，修改属性使用
	defaultProps: QuestionTitleDefaultProps
}
