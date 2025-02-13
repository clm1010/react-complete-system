import type { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

/**
 * @description QuestionParagraph 段落组件
 * @param props QuestionParagraphPropsType
 */
const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
	const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

	return (
		<Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
			{text}
		</Paragraph>
	)
}

export default Component
