import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// 页面信息 Reducer

/**
 * @description 页面信息类型
 */
export type PageInfoType = {
	title: string
	desc?: string
	js?: string
	css?: string
}

/**
 * @description 初始化页面信息
 */
const INIT_STATE: PageInfoType = {
	title: '',
	desc: '',
	js: '',
	css: ''
}

const pageInfoSlice = createSlice({
	name: 'pageInfo',
	initialState: INIT_STATE,
	reducers: {
		resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
			return action.payload
		}
	}
})

export const { resetPageInfo } = pageInfoSlice.actions

export default pageInfoSlice.reducer
