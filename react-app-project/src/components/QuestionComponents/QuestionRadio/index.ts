import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'

export * from './interface'

/**
 * @description  QuestionRadio 单选组件配置
 */
export default {
	title: '单选',
	type: 'questionRadio', // 要和后端统一好
	Component, // 画布显示的组件
	PropComponent, // 属性组件，修改属性使用
	defaultProps: QuestionRadioDefaultProps
}
