import type { FC } from 'react'
import { createContext, useReducer } from 'react'
import reducer, { ActionType } from './reducer'
import initialState from './store'
import InputForm from './InputForm'
import List from './List'

export const TodoContext = createContext({
  state: initialState,
  // eslint-disable-next-line
  dispatch: (action: ActionType) => {}
})

const TodoReducerDemo: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <p>TodoReducer by List</p>
      <List />
      <InputForm />
    </TodoContext.Provider>
  )
}

export default TodoReducerDemo
