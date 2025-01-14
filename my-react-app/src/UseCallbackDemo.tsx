import type { FC } from 'react'
import { useCallback, useState } from 'react'

const UseCallbackDemo: FC = () => {
  const [text, setText] = useState('hello')

  const fn1 = () => {
    console.log('fn1 text', text)
  }

  const fn2 = useCallback(() => {
    console.log('fn2 text', text)
  }, [text]) // 依赖 text，text 更新时，fn2 也会更新

  return (
    <>
      <div>
        <button onClick={fn1}>fn1</button>
        <button onClick={fn2}>fn2</button>
      </div>
      <div>
        {/* form 组件，受控组件 */}
        <input
          type='text'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
    </>
  )
}

export default UseCallbackDemo
