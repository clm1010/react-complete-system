import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import List from '../pages/manage/List'
import Star from '../pages/manage/Star'
import Trash from '../pages/manage/Trash'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/register',
				element: <Register />
			},
			{
				// manage 路由配置
				path: 'manage',
				element: <ManageLayout />,
				children: [
					{
						path: 'list',
						element: <List />
					},
					{
						path: 'star',
						element: <Star />
					},
					{
						path: 'trash',
						element: <Trash />
					}
				]
			},
			{
				path: '*', // 404 路由配置
				element: <NotFound />
			}
		]
	},
	{
		// question 路由配置
		path: 'question',
		element: <QuestionLayout />,
		children: [
			{
				path: 'edit/:id',
				element: <Edit />
			},
			{
				path: 'stat/:id', // statistic 统计
				element: <Stat />
			}
		]
	}
])

export default router

// ---------------------------------- 常用路由地址
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const HOME_PATHNAME = '/'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

/**
 * @description 判断是否是登录或注册页面
 * @param pathname 路由地址
 * @returns 判断是否是登录或注册页面

 */
export const isLoginOrRegister = (pathname: string) => {
	if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
	return false
}

/**
 * @description 判断是否不需要用户信息
 * @param pathname 路由地址
 */
export const isNoNeedUserInfo = (pathname: string) => {
	if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
	return false
}
