import type { FC } from 'react'
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'
import { STAT_COLORS } from '../../../constant'

const dataBar = [
	{
		name: 'Page A',
		uv: 4000
	},
	{
		name: 'Page B',
		uv: 3000
	},
	{
		name: 'Page C',
		uv: 2000
	},
	{
		name: 'Page D',
		uv: 2780
	},
	{
		name: 'Page E',
		uv: 1890
	},
	{
		name: 'Page F',
		uv: 2390
	},
	{
		name: 'Page G',
		uv: 3490
	}
]

const BarDemo: FC = () => {
	return (
		<div style={{ width: '400px', height: '300px', textAlign: 'center' }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={400}
					height={300}
					data={dataBar}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend iconType="circle" wrapperStyle={{ lineHeight: '40px' }} align="right" />
					<Bar dataKey="uv" stackId="a" fill="#8884d8">
						{dataBar.map((i, index) => {
							return <Cell key={index} fill={STAT_COLORS[index]} />
						})}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default BarDemo
