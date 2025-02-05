import { nanoid } from 'nanoid'

export type TodoType = {
  id: string
  title: string
}

// 初始状态 todo list
const initialState: TodoType[] = [
  { id: nanoid(5), title: 'todo1' },
  { id: nanoid(5), title: 'todo2' },
  { id: nanoid(5), title: 'todo3' }
]

export default initialState
