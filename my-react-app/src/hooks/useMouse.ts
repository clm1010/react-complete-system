import { useState, useEffect, useCallback } from 'react'

/**
 * @description 获取鼠标位置
 */
const useMouse = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  // useCallback 缓存函数
  const handlerMouseMove = useCallback((event: MouseEvent) => {
    setX(event.clientX)
    setY(event.clientY)
  }, [])

  useEffect(() => {
    // 监听鼠标事件
    window.addEventListener('mousemove', handlerMouseMove)

    // 当组件销毁时,一定要解绑DOM事件！！！
    // 因为 window.addEventListener('mousemove',handlerMouseMove)，是自己绑定的事件
    // 不解绑的话，会造成内存泄漏
    // 绑定或解绑要相同的函数，否则没有用
    return () => {
      window.removeEventListener('mousemove', handlerMouseMove)
    }
  }, [])

  return { x, y }
}

export default useMouse
