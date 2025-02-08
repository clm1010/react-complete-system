import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	isLoginOrRegister,
	isNoNeedUserInfo,
	MANAGE_INDEX_PATHNAME,
	LOGIN_PATHNAME
} from '../router/index'
import useGetUserInfo from './useGetUserInfo'

/**
 * @description 根据当前用户的登录状态决定跳转的页面
 * @param waitingUserData 是否获取用户信息
 */
const useNavPage = (waitingUserData: boolean) => {
	const { username } = useGetUserInfo()
	const { pathname } = useLocation()
	const nav = useNavigate()

	useEffect(() => {
		if (waitingUserData) return

		// 已经登录了
		if (username) {
			if (isLoginOrRegister(pathname)) {
				nav(MANAGE_INDEX_PATHNAME)
			}
			return
		}

		// 未登录
		if (isNoNeedUserInfo(pathname)) {
			return
		} else {
			nav(LOGIN_PATHNAME)
		}
	}, [waitingUserData, username, pathname])
}

export default useNavPage
