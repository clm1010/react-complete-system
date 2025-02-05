import type { ChangeEvent, FC } from 'react'
// import { useReducer } from 'react'
import { useContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { TodoContext } from './index'
// import reducer from './reducer'
// import initialState from './store'

const InputForm: FC = () => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const { state, dispatch } = useContext(TodoContext)

  // 输入框文本
  const [text, setText] = useState('')
  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  // 新增 todo
  const handlerSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!text.trim()) return

    const newTodo = {
      id: nanoid(5),
      title: text
    }

    dispatch({ type: 'add', payload: newTodo })
    setText('')
  }

  return (
    <form onSubmit={handlerSubmit}>
      <label htmlFor="new-todo">What needs to be done</label>
      <br />
      <input type="text" id="new-todo" onChange={handlerChange} value={text} />
      <button type="submit">Add #{state.length + 1}</button>
    </form>
  )
}

export default InputForm
