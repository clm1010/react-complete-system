import type { FC } from 'react'
import { useRef } from 'react'

const UseRefDemo: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const nameRef = useRef('CLM')
  /**
   * @description 选中 input
   */
  const handlerSelect = () => {
    const inputElem = inputRef.current
    if (inputElem) {
      inputElem.select() // DOM 节点，DOM 操作 API
    }
  }

  /**
   * @description 修改 name，但更新不会触发 rerender, state 修改会触发 rerender
   */
  const handlerChangeName = () => {
    nameRef.current = 'CLM1010'
    console.log(nameRef.current)
  }
  return (
    <div>
      <h1>useRef</h1>
      <div>
        <p>DOM节点操作</p>
        <input ref={inputRef} defaultValue='hello' />
        <button onClick={handlerSelect}>select input</button>
      </div>

      <div>
        <p>name</p>
        <p>name: {nameRef.current}</p>
        <div>
          <button onClick={handlerChangeName}>change name</button>
        </div>
      </div>
    </div>
  )
}

export default UseRefDemo
