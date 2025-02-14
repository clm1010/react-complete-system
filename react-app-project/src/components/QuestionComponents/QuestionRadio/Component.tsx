import type { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const { Paragraph } = Typography

/**
 * @description QuestionRadio 组件
 * @param props QuestionRadioPropsType
 * @returns
 */
const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
	const { title, isVertical, options = [], value } = { ...QuestionRadioDefaultProps, ...props }

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Radio.Group value={value}>
				<Space direction={isVertical ? 'vertical' : 'horizontal'}>
					{options.map((opt) => {
						const { value, text } = opt
						return (
							<Radio key={value} value={value}>
								{text}
							</Radio>
						)
					})}
				</Space>
			</Radio.Group>
		</div>
	)
}

export default QuestionRadio
