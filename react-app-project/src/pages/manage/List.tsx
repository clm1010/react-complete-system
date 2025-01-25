import type { FC } from 'react'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { getQuestionListService } from '../../services/question'
// import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { DEFAULT_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant/index'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import ListSearch from '../../components/ListSearch/ListSearch'
import styles from './common.module.scss'

const { Title } = Typography

type questionListType = {
	_id: string
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const List: FC = () => {
	useTitle('我的问卷 - 我的问卷')

	// 使用自定义 hooks 获取数据
	// const { loading, data = {} } = useLoadQuestionListData()
	// const { list = [], total = 0 } = data

	const [started, setStarted] = useState(false) // 标记是否开始加载

	const [page, setPage] = useState(1) // list 内部的数据，不在url参数中体现
	const [total, setTotal] = useState(0)
	const [list, setList] = useState([]) // 全部的列表数据，上划加载更多用，累计
	const haveMoreData = total > list.length // 有没有更多的，未加载完成的数据
	const [searchParams] = useSearchParams() // url 参数,虽然没有 page pageSize, 但有 keyword
	const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

	// keyword 变化时, 重置数据
	useEffect(() => {
		setStarted(false)
		setPage(1)
		setTotal(0)
		setList([])
	}, [keyword])

	// 真正加载
	const { run: load, loading } = useRequest(
		async () => {
			const data = await getQuestionListService({
				keyword,
				page,
				pageSize: DEFAULT_PAGE_SIZE
			})
			return data
		},
		{
			onSuccess: (data) => {
				const { list: newList = [], total = 0 } = data
				setList(list.concat(newList))
				setTotal(total) // 总数 累计
				setPage(page + 1) // page 累计
			},
			manual: true // 手动触发
		}
	)

	// useRef 获取 dom
	const containerRef = useRef<HTMLDivElement>(null)
	// 触发加载 - 防抖 tryLoadMore
	const { run: tryLoadMore } = useDebounceFn(
		() => {
			const elem = containerRef.current
			if (elem == null) return
			const domRect = elem.getBoundingClientRect()
			if (domRect == null) return
			const { bottom } = domRect
			if (bottom <= document.body.clientHeight) {
				// console.log('执行加载')
				load() // 执行加载
				setStarted(true) // 标记开始加载
			}
		},
		{ wait: 1000 }
	)

	// 1.首次加载时，触发 tryLoadMore，依赖 searchParams 变化，触发 tryLoadMore
	useEffect(() => {
		tryLoadMore()
	}, [searchParams])

	// 2.当页面滚动时，尝试触发加载
	useEffect(() => {
		if (haveMoreData) {
			window.addEventListener('scroll', tryLoadMore) // 考虑防抖
		}
		// 当 searchParams 变化之前，移除销毁 scroll 事件，避免内存泄露，重要！！！
		return () => {
			window.removeEventListener('scroll', tryLoadMore)
		}
	}, [searchParams, haveMoreData])

	//  LoadMore Elem, 根据状态显示不同的内容
	// 使用 useMemo 缓存，避免重复渲染
	const loadMoreContentElem = useMemo(() => {
		if (!started || loading) return <Spin />
		if (total === 0)
			return (
				<Empty
					image={Empty.PRESENTED_IMAGE_DEFAULT}
					styles={{ image: { height: 100 } }}
					description={<Typography.Text>暂无问卷</Typography.Text>}
				></Empty>
			)
		if (!haveMoreData) return <Typography.Text>没有更多了...</Typography.Text>
		return <Typography.Text>加载中...</Typography.Text>
	}, [started, loading, haveMoreData])
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{/* 问卷列表 */}
				{list.length > 0 &&
					list.map((question: questionListType) => {
						const { _id } = question
						return (
							<QuestionCard
								key={_id}
								// {...question} 也可以这么写，解构
								_id={question._id}
								title={question.title}
								isPublished={question.isPublished}
								isStar={question.isStar}
								answerCount={question.answerCount}
								createdAt={question.createdAt}
							/>
						)
					})}
			</div>
			<div className={styles.footer}>
				<div ref={containerRef}>{loadMoreContentElem}</div>
			</div>
		</>
	)
}

export default List
