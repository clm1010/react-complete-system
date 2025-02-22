import type { FC } from 'react'
import { Typography } from 'antd'
import PieDemo from './PieDemo'
import BarDemo from './BarDemo'

const { Title } = Typography

/**
 * @description 定义 props 接收的类型
 */
type PropsType = {
	selectedComponentId: string
	selectedComponentType: string
}

/**
 * @description 图表统计
 */
const ChartStat: FC<PropsType> = (props: PropsType) => {
	const { selectedComponentId, selectedComponentType } = props

	return (
		<>
			<Title level={3}>图表统计</Title>
			<div>
				{/* <PieDemo /> */}
				<BarDemo />
			</div>
		</>
	)
}

export default ChartStat
