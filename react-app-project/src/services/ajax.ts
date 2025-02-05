import axios from 'axios'
import { message } from 'antd'
import { getUserToken } from '../utils/user-token'

const instance = axios.create({
	timeout: 10 * 1000
})

// request 拦截器: 每次请求都带上 token
instance.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${getUserToken()}` // JWT 的固定格式
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// response 拦截器: 统一处理 errno 和 msg
instance.interceptors.response.use((res) => {
	const resData = (res.data || {}) as ResType
	const { errno, data, msg } = resData

	if (errno !== 0) {
		// 错误提示
		if (msg) {
			message.error(msg)
		}
		throw new Error(msg)
	}

	return data as any
})

export default instance

export type ResType = {
	errno: number
	data?: ResDataType
	msg?: string
}

/**
 * @description data 数据类型要求
 * @type ResDataType [key:string] 表示 key 为任意字符串， any （值）表示任意类型
 */
export type ResDataType = {
	[key: string]: any
}
