import type { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

/**
 * @description QuestionTitle 组件
 * @param props QuestionTitlePropsType
 */
const Component: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
	const {
		text = '',
		level = 1,
		isCenter = false
	} = {
		...QuestionTitleDefaultProps,
		...props
	}

	const getFontSize = (level: number) => {
		switch (level) {
			case 1:
				return '24px'
			case 2:
				return '20px'
			case 3:
				return '16px'
			default:
				return '16px'
		}
	}
	return (
		<Title
			level={level}
			style={{
				textAlign: isCenter ? 'center' : 'start',
				marginBottom: '0',
				fontSize: getFontSize(level)
			}}
		>
			{text}
		</Title>
	)
}

export default Component
