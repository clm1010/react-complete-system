import type { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface'

const { Paragraph } = Typography

/**
 * @description QuestionInput 组件
 * @param props QuestionInputPropsType
 */
const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
	const { title, placeholder } = {
		...QuestionInputDefaultProps,
		...props
	}
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<Input placeholder={placeholder} />
			</div>
		</div>
	)
}
export default QuestionInput
