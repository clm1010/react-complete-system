import { useSearchParams } from 'react-router'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

type OptionType = {
	isStar: boolean
	isDeleted: boolean
}

/**
 * @deprecated 搜索加载问卷列表数据 hook
 * @returns {loading: boolean, data: any, error: any}
 */
const useLoadQuestionListData = (opt: Partial<OptionType> = {}) => {
	const { isStar, isDeleted } = opt
	const [searchParams] = useSearchParams()

	const { loading, data, error } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

			const data = await getQuestionListService({ keyword, isStar, isDeleted })
			return data
		},
		{
			refreshDeps: [searchParams] // 搜索时候，刷新依赖项
		}
	)

	return { loading, data, error }
}

export default useLoadQuestionListData
