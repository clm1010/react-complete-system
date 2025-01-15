import { useState, useEffect } from 'react'

/**
 * @description 获取信息
 * @function getInfo Promise<string>
 * @returns 返回一个Promise，Promise类型的值是string
 */
const getInfo = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello')
    }, 1500)
  })
}

/**
 * @description useGetInfo 模拟获取数据 hook
 * @function useGetInfo
 * @returns 返回 loading 和 info
 */
const useGetInfo = () => {
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState('')

  useEffect(() => {
    getInfo().then((res) => {
      setLoading(false)
      setInfo(res)
    })
  }, [])

  return {
    loading,
    info
  }
}

export default useGetInfo
