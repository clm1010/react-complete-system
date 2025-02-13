import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '../services/user'
import useGetUserInfo from './useGetUserInfo'
import { loginReducer } from '../store/useReducer'

function useLoadUserData() {
	const dispatch = useDispatch()

	const [waitingUserData, setWaitingUserData] = useState(true)

	// ajax 加载用户信息
	const { run } = useRequest(getUserInfoService, {
		manual: true,
		onSuccess: (result) => {
			const { username, nickname } = result
			// 保存用户信息到 redux store
			dispatch(loginReducer({ username, nickname }))
		},
		onFinally: () => {
			setWaitingUserData(false)
		}
	})

	// 判断当前 redux store 中是否有用户信息
	const { username } = useGetUserInfo() // redux store 中的用户信息
	useEffect(() => {
		if (username) {
			setWaitingUserData(false) // 如果 redux store 已经存在用户信息，就不用重新加载了
			return
		}
		run() // 如果 redux store 中没有用户信息，就重新加载
	}, [username])

	return { waitingUserData }
}

export default useLoadUserData
