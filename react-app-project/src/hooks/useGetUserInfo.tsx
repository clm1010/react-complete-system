import { useSelector } from 'react-redux'
import { StateType } from '../store/index'
import { UserStateType } from '../store/useReducer'

/**
 * @description 获取用户信息
 * @returns {username: string, nickname: string}
 */
const useGetUserInfo = () => {
	const { username, nickname } = useSelector<StateType>((state) => state.user) as UserStateType
	return { username, nickname }
}

export default useGetUserInfo
