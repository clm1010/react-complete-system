import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './interface'

export * from './interface'

/**
 * @description QuestionParagraph 段落组件配置
 */
export default {
	title: '段落',
	type: 'questionParagraph', // 要和后端统一好
	Component, // 画布显示的组件
	PropComponent, // 属性组件，修改属性使用
	defaultProps: QuestionParagraphDefaultProps
}
