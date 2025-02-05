import type { TodoType } from './store'

export type ActionType = {
  type: string
  payload?: any // 附加的内容（新增的 todo，删除的 todoId），可选属性
}

export default function reducer(state: TodoType[], action: ActionType) {
  switch (action.type) {
    case 'add':
      return state.concat(action.payload) // 返回新的 state, 不改变原来的 state
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload) // 返回新的 state, 不改变原来的 state
    default:
      throw new Error()
  }
}
