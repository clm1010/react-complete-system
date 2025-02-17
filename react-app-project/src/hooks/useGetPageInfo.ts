import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { PageInfoType } from '../store/pageInfoReducer'

function useGetPageInfo() {
	const pageInfo = useSelector<StateType>((state) => state.pageInfo) as PageInfoType
	return pageInfo
}

export default useGetPageInfo
