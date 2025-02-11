import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput/index'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle/index'

// 统一，各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一，组件配置 type
export type ComponentConfType = {
	title: string
	type: string
	Component: FC<ComponentPropsType>
	defaultProps: ComponentPropsType
}

// 全部的组件配置列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

// 组件分组
export const componentConfGroup = [
	{
		groupId: 'TextGroup',
		groupName: '文本显示',
		components: [QuestionTitleConf]
	},
	{
		groupId: 'InputGroup',
		groupName: '用户输入框',
		components: [QuestionInputConf]
	}
]
// 根据 type 获取配置
export const getComponentConfByType = (type: string) => {
	return componentConfList.find((item) => item.type === type)
}

export default componentConfList
