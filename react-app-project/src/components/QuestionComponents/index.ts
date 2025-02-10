import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput/index'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle/index'

// 统一，所有组件的类型
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 所有组件配置
export type ComponentConfType = {
	title: string
	type: string
	Component: FC<ComponentPropsType>
	defaultProps: ComponentPropsType
}

// 所有组件配置列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

// 根据 type 获取配置
export const getComponentConfByType = (type: string) => {
	return componentConfList.find((item) => item.type === type)
}

export default componentConfList
