import type { FC } from 'react'
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from 'recharts'
import { STAT_COLORS } from '../../../constant'
import type { QuestionCheckboxStatPropsType } from './interface'

/**
 * @description 柱状图组件
 */
const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat = [] }) => {
	return (
		<div style={{ width: '400px', height: '300px', textAlign: 'center' }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={400}
					height={300}
					data={stat}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					{/* <Legend iconType="circle" wrapperStyle={{ lineHeight: '40px' }} align="right" /> */}
					<Bar dataKey="count" stackId="a" fill="#8884d8">
						{stat.map((i, index) => {
							return <Cell key={index} fill={STAT_COLORS[index]} />
						})}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default StatComponent
