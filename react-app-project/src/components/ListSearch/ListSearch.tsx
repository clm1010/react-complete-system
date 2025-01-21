import { type FC, ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router'
import { LIST_SEARCH_PARAM_KEY } from '../../constant'
import { Input } from 'antd'
const { Search } = Input

const ListSearch: FC = () => {
	const [value, setValue] = useState('')

	const nav = useNavigate()
	const { pathname } = useLocation()

	// 获取 url 参数，并设置到 input value
	const [searchParams] = useSearchParams()
	useEffect(() => {
		const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
		setValue(curVal)
		// 每当 searchParams 发生变化时，都会执行 useEffect
	}, [searchParams])

	const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const handleSearch = (value: string) => {
		// 跳转页面，增加 url 参数
		nav({
			pathname,
			search: `${LIST_SEARCH_PARAM_KEY}=${value}`
		})
	}

	return (
		<Search
			size="middle"
			style={{ width: 300 }}
			placeholder="输入关键字"
			enterButton
			allowClear
			value={value}
			onChange={handleChangeSearch}
			onSearch={handleSearch}
		/>
	)
}

export default ListSearch
