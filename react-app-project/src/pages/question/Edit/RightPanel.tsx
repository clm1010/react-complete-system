import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

// TS 枚举类型，用于标识选项卡的 key
enum TAB_KEYS {
	PROP_KEY = 'prop',
	SETTING_KEY = 'setting'
}

const RightPanel: FC = () => {
	const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
	const { selectedId } = useGetComponentInfo()

	// 切换选中组件时，自动切换到属性面板
	useEffect(() => {
		if (selectedId) {
			setActiveKey(TAB_KEYS.PROP_KEY)
		} else {
			setActiveKey(TAB_KEYS.SETTING_KEY)
		}
	}, [selectedId])

	const tabsItems = [
		{
			key: TAB_KEYS.PROP_KEY,
			label: (
				<span>
					<FileTextOutlined />
					属性
				</span>
			),
			children: <ComponentProp />
		},
		{
			key: TAB_KEYS.SETTING_KEY,
			label: (
				<span>
					<SettingOutlined />
					页面设置
				</span>
			),
			children: <PageSetting />
		}
	]
	return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>
}

export default RightPanel
