import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '../../../services/stat'
import { getComponentConfByType } from '../../../components/QuestionComponents/index'

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
	const { id = '' } = useParams()
	const [stat, setStat] = useState([])

	const { selectedComponentId, selectedComponentType } = props

	const { run } = useRequest(
		async (questionId, componentId) => {
			return await getComponentStatService(questionId, componentId)
		},
		{
			manual: true,
			onSuccess: (res) => {
				setStat(res.stat)
			}
		}
	)

	// 监听 selectedComponentId 有值就执行 run
	useEffect(() => {
		if (selectedComponentId) {
			run(id, selectedComponentId)
		}
	}, [id, selectedComponentId])

	// 生成统计元素
	function genStatElem() {
		if (!selectedComponentId) return <div>未选中组件</div>
		// 根据选中组件的类型获取配置
		const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
		// 如果没有配置统计组件，返回无统计图表
		if (StatComponent == null) return <div>该组件无统计图表</div>
		// 有配置统计组件，返回统计组件
		return <StatComponent stat={stat} />
	}

	return (
		<>
			<Title level={3}>图表统计</Title>
			<div>{genStatElem()}</div>
		</>
	)
}

export default ChartStat
