import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 用户信息 Reducer

/**
 * @description 用户信息类型
 */
export type UserStateType = {
	username: string
	nickname: string
}

/**
 * @description 初始化用户信息
 */
const INIT_STATE: UserStateType = {
	username: '',
	nickname: ''
}

/**
 * @description 用户信息 slice
 */
export const userSlice = createSlice({
	name: 'user',
	initialState: INIT_STATE,
	reducers: {
		// 登录 设置用户信息
		loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
			return action.payload // 设置 username nickname 到 redux store 中
		},
		// 退出 清除用户信息
		logoutReducer: () => INIT_STATE
	}
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
