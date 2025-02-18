import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent
} from '../store/componentsReducer/index'

/**
 * @description 判断当前激活的元素是否是 input 元素
 */
function isActiveElementValid() {
	const activeElement = document.activeElement // 获取当前激活的元素

	// 没有增加 dnd-kit 拖拽之前的判断
	// if (activeElement === document.body) return true // 如果当前激活的元素是body，光标没有 focus 到 input

	// 增加 dnd-kit 拖拽之后的判断
	if (activeElement === document.body) return true
	if (activeElement?.matches('div[role="button"]')) return true

	return false
}

/**
 * @description 绑定画布区域的键盘快捷键事件
 */
function useBindCanvasKeyPress() {
	// 获取dispatch方法
	const dispatch = useDispatch()

	// 删除
	useKeyPress(['Backspace', 'Delete'], () => {
		if (!isActiveElementValid()) return
		dispatch(removeSelectedComponent())
	})

	// 复制
	useKeyPress(['ctrl.c', 'meta.c'], () => {
		if (!isActiveElementValid()) return
		dispatch(copySelectedComponent())
	})

	// 粘贴
	useKeyPress(['ctrl.v', 'meta.v'], () => {
		if (!isActiveElementValid()) return
		dispatch(pasteCopiedComponent())
	})

	// 选中上一个
	useKeyPress('uparrow', () => {
		if (!isActiveElementValid()) return
		dispatch(selectPrevComponent())
	})

	// 选中下一个
	useKeyPress('downarrow', () => {
		if (!isActiveElementValid()) return
		dispatch(selectNextComponent())
	})

	//TODO 撤销

	//TODO 重做
}

export default useBindCanvasKeyPress
