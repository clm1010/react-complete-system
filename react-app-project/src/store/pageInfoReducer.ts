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
		/**
		 * @description 重置页面信息
		 * @param state 页面信息类型
		 * @param action PayloadAction
		 * @returns action.payload 页面信息
		 */
		resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
			return action.payload
		},
		/**
		 * @description @reduxjs/toolkit 2.0 版本 内置了 immer，可以不用写 produce
		 * @description 修改页面标题
		 * @param state  页面信息类型
		 * @param action PayloadAction String
		 */
		changePageTitle: (state: PageInfoType, action: PayloadAction<string>) => {
			state.title = action.payload
		}
	}
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
