import type { FC } from 'react'
import { useState, useRef, useEffect } from 'react'

const ClosureTrap: FC = () => {
  const [count, setCount] = useState(0)

  // 解决闭包陷阱 声明一个 useRef
  const countRef = useRef(0)

  // 使用 useEffect 监听 count，当 count 发生变化时，更新 countRef
  useEffect(() => {
    countRef.current = count
  }, [count])

  const add = () => {
    setCount(count + 1)
  }

  const alertFn = () => {
    // 当点击 alert 时，在快速点击 add 的情况下，会出现 闭包陷阱
    // setTimeout 式异步执行 此时 count 会被暂存到 evevt loop 中事件轮询等待同步执行完
    // 使用 useRef 可以解决 闭包陷阱
    window.setTimeout(() => {
      // window.alert(count) // count 是 值类型
      window.alert(countRef.current) // ref 是 引用类型
    }, 3000)
  }

  return (
    <>
      <p>闭包陷阱</p>
      <span>{count}</span>
      <button onClick={add}>add</button>
      <button onClick={alertFn}>alert</button>
    </>
  )
}

export default ClosureTrap
