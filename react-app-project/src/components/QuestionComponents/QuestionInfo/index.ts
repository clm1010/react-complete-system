import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

/**
 * @description QuestionInfo 信息组件配置
 */
export default {
	title: '问题信息',
	type: 'questionInfo', // 要和后端统一好
	Component, // 画布显示的组件
	PropComponent, // 属性组件，修改属性使用
	defaultProps: QuestionInfoDefaultProps
}
