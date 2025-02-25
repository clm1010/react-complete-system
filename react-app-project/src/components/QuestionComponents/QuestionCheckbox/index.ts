import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { QuestionCheckboxDefaultProps } from './interface'

export * from './interface'

/**
 * @description QuestionCheckbox 多选组件配置
 */
export default {
	title: '多选',
	type: 'questionCheckbox', // 要和后端统一好
	Component, // 画布显示的组件
	PropComponent, // 属性组件，修改属性使用
	defaultProps: QuestionCheckboxDefaultProps,
	// 统计组件
	StatComponent
}
