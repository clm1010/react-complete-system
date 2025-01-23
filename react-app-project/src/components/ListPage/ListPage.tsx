import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router'
import { Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	LIST_PAGE_PARAM_KEY,
	LIST_PAGE_SIZE_PARAM_KEY
} from '../../constant/index'

type PropsType = {
	total: number
}

// 分页设置
const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
	if (type === 'prev') {
		return <a>上一页</a>
	}
	if (type === 'next') {
		return <a>下一页</a>
	}
	return originalElement
}
/**
 * @description 分页组件
 * @param {PropsType} props - 组件属性
 * @param {number} props.total - 总数
 */
const ListPage: FC<PropsType> = (props: PropsType) => {
	const { total } = props
	const [current, setCurrent] = useState(DEFAULT_PAGE)
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

	// 从 url 参数中获取 page 和 pageSize 并且同步到 Pagination 组件中
	const [searchParams] = useSearchParams()

	useEffect(() => {
		const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || DEFAULT_PAGE
		const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || DEFAULT_PAGE_SIZE
		setCurrent(page)
		setPageSize(pageSize)
	}, [searchParams])

	// page pageSize 改变时，跳转页面（改变url参数）
	const nav = useNavigate()
	const { pathname } = useLocation()
	const handlePageChange = (page: number, pageSize: number) => {
		searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
		searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
		nav({
			pathname,
			search: searchParams.toString()
		})
	}

	return (
		<Pagination
			align="center"
			itemRender={itemRender}
			current={current}
			total={total}
			pageSize={pageSize}
			onChange={handlePageChange}
		/>
	)
}

export default ListPage
