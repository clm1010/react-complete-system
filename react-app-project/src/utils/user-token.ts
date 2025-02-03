/**
 * @description 存储/获取/ user token
 */

const KEY = 'USER_TOKEN'

/**
 * @description 存储 user token
 * @param token token
 */
export const setUserToken = (token: string) => {
	localStorage.setItem(KEY, token) // 存储 token
}

/**
 * @description 获取 user token
 * @returns {string} token
 */
export const getUserToken = () => {
	// 获取 token
	return localStorage.getItem(KEY) || ''
}

/**
 * @description 删除 user token
 */
export const removeUserToken = () => {
	localStorage.removeItem(KEY) // 删除 token
}
