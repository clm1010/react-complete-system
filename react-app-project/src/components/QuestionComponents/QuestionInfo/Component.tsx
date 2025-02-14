import type { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'

const { Title, Paragraph } = Typography

/**
 * @description QuestionInfo 组件
 * @param props QuestionInfoPropsType
 */
const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
	const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }

	// 处理换行
	const descTextList = desc.split('\n')

	return (
		<div style={{ textAlign: 'center' }}>
			<Title level={3}>{title}</Title>
			<Paragraph>
				{descTextList.map((t, index) => {
					return (
						<span key={index}>
							{index > 0 && <br />}
							{t}
						</span>
					)
				})}
			</Paragraph>
		</div>
	)
}

export default QuestionInfo
