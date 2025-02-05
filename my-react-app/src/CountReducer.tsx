import { type FC } from 'react'
import { useState, useReducer } from 'react'

type StateType = { count: number }
type ActionType = { type: string }

const initialState: StateType = { count: 100 } // 初始状态

// reducer 函数, 根据传入的 action 返回新的 state (注意state是不可变数据，所以不是修改 state 的值，而是返回一个新的state值),
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 } // 返回新的 state
    case 'decrement':
      return { count: state.count - 1 } // 返回新的 state
    default:
      throw new Error()
  }
}

const CountReducer: FC = () => {
  // const [count, setCount] = useState(100) // 使用 useState

  // 使用 useReducer
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      {/* <span>count: {count}</span> */}
      <span>state count: {state.count}</span>
      {/* <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button> */}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}

export default CountReducer
