import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { UserStateType } from '../store/useReducer'

/**
 * @description 获取用户信息
 * @returns {username: string, nickname: string}
 */
function useGetUserInfo() {
	const { username, nickname } = useSelector<StateType>((state) => state.user) as UserStateType
	return { username, nickname }
}

export default useGetUserInfo
