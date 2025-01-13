import { FC, useState } from 'react'

const StateDemo1: FC = () => {
  const [count, setCount] = useState(0) // useState 可以触发组件更新
  const add = () => {
    // count++
    setCount(count => count + 1)
    setCount(count => count + 1)
    setCount(count => count + 1)
    setCount(count => count + 1)
    setCount(count => count + 1)
    console.log(count)
  }
  return (
    <>
      <div>
        <button onClick={add}>add {count}</button>
      </div>
    </>
  )
}

export default StateDemo1
