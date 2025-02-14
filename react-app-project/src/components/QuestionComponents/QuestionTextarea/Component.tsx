import type { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './interface'

const { Paragraph } = Typography
const { TextArea } = Input

/**
 * @description QuestionTextarea 组件
 * @param props QuestionTextareaPropsType
 */
const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
	const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<TextArea placeholder={placeholder} />
			</div>
		</div>
	)
}

export default QuestionTextarea
