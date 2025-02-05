import type { FC } from 'react'
import { useContext } from 'react'
import { TodoContext } from './index'
// import { useReducer } from 'react'
// import reducer from './reducer'
// import initialState from './store'

const List: FC = () => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const { state, dispatch } = useContext(TodoContext)

  const handleDelete = (id: string) => {
    dispatch({ type: 'delete', payload: id })
  }

  return (
    <ul>
      {state.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => handleDelete(todo.id)}>删除</button>
        </li>
      ))}
    </ul>
  )
}

export default List
