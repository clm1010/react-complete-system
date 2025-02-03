import axios from './ajax'
import type { ResDataType } from './ajax'

/**
 * @description: 获取用户信息
 * @returns data 用户信息
 */
export async function getUserInfoService(): Promise<ResDataType> {
	const url = '/api/user/info'
	const data = (await axios.get(url)) as ResDataType
	return data
}

/**
 * @description: 用户注册
 * @param username 用户名
 * @param password 密码
 * @param nickname 昵称 不填写默认为用户名
 * @returns data 返回注册是否成功
 */
export async function registerService(
	username: string,
	password: string,
	nickname?: string
): Promise<ResDataType> {
	const url = '/api/user/register'
	const body = {
		username,
		password,
		nickname: nickname || username
	}
	const data = (await axios.post(url, body)) as ResDataType
	return data
}

/**
 * @description: 用户登录
 * @param username 用户名
 * @param password 密码
 * @returns data token
 */
export async function loginService(username: string, password: string): Promise<ResDataType> {
	const url = '/api/user/login'
	const body = {
		username,
		password
	}
	const data = (await axios.post(url, body)) as ResDataType
	return data
}
