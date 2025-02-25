import type { FC } from 'react'
import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { STAT_COLORS } from '../../../constant'
import type { QuestionRadioStatPropsType } from './interface'

const format = (n: number) => {
	return (n * 100).toFixed(2)
}

/**
 * @description 饼图组件
 * @param param { stat: StatType[] } 统计数据
 */
const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
	const sum = useMemo(() => {
		// sum 求和
		let s = 0
		stat.forEach((i) => {
			s += i.count
		})
		return s
	}, [stat])

	return (
		<div style={{ width: '300px', height: '400px', textAlign: 'center' }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						dataKey="count"
						isAnimationActive={true}
						data={stat}
						cx="50%" // x 轴的偏移量
						cy="50%" // y 轴的偏移量
						outerRadius={80} // 饼图的直径
						fill="#8884d8"
						label={(i) => `${i.name}：${format(i.count / sum)}%`}
					>
						{stat.map((i, index) => {
							return <Cell key={index} fill={STAT_COLORS[index]} />
						})}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default StatComponent
