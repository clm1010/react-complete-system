import { FC, useState } from 'react'
import { produce } from 'immer'

const ImmerDemo: FC = () => {
  const [userInfo, setUserInfo] = useState({ name: 'ZhangSan', age: 18 })
  const handlerChange = () => {
    // 不可变数据 - 不去修改 state 的值，而是传入一个新的值
    // setUserInfo({ ...userInfo, age: userInfo.age + 1 }) // 对象 解构语法

    // 使用 immer 的写法，操作不可变数据
    setUserInfo(
      produce((draft) => {
        draft.age += 1
      })
    )
  }

  const [list, setList] = useState(['x', 'y'])
  const handlerAddList = () => {
    // 不可变数据
    // list.push('z') // 这么写不可以，因为 list 不可变，而是传入一个新的值

    // setList(list.concat('z')) // 第一种写法 concat 返回一个新的数组
    // setList([...list, 'z']) // 第二种写法 数组 解构语法

    // 使用 immer 的写法，操作不可变数据
    setList(
      produce((draft) => {
        draft.push('z')
      })
    )
  }

  return (
    <div>
      <h2>state 不可变数据</h2>
      <div>{JSON.stringify(userInfo)}</div>
      <button onClick={handlerChange}>change age</button>
      <div>{JSON.stringify(list)}</div>
      <button onClick={handlerAddList}>change list</button>
    </div>
  )
}

export default ImmerDemo
