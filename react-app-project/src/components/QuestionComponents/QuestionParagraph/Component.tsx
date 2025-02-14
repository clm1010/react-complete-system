import type { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

/**
 * @description QuestionParagraph 段落组件
 * @param props QuestionParagraphPropsType
 */
const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
	const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

	// 处理换行
	const textList = text.split('\n')

	return (
		<Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
			{textList.map((t, index) => {
				return (
					<span key={index}>
						{index > 0 && <br />}
						{t}
					</span>
				)
			})}
		</Paragraph>
	)
}

export default QuestionParagraph
