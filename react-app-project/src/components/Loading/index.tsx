import { type FC } from 'react'
import { Spin } from 'antd'

type PropsType = {
	tip?: string
	size?: string
}

const contentStyle: React.CSSProperties = {
	padding: 60,
	background: 'rgba(0, 0, 0, 0.02)',
	borderRadius: 4
}
const content = <div style={contentStyle} />

const Loading: FC<PropsType> = (props: PropsType) => {
	const { tip = '加载中...', size = 'default' } = props
	return (
		<Spin tip={tip} size={size as 'small' | 'default' | 'large'}>
			{content}
		</Spin>
	)
}

export default Loading
