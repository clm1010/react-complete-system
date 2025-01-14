import type { FC } from 'react'
import { useMemo, useState } from 'react'
const UseMemo: FC = () => {
  console.log('demo...')
  const [num1, setNum1] = useState(10)
  const [num2, setNum2] = useState(20)
  const [text, setText] = useState('hello') // 更新，导致组件 rerender

  const sum = useMemo(() => {
    console.log('gen sum...') //测试缓存效果，不会触发 rerender
    return num1 + num2
  }, [num1, num2])

  return (
    <div>
      <p>{sum}</p>
      <p>
        {num1} <button onClick={() => setNum1(num1 + 1)}>add num1</button>
      </p>
      <p>
        {num2} <button onClick={() => setNum2(num2 + 1)}>add num2</button>
      </p>
      <div>
        <input onChange={(e) => setText(e.target.value)} value={text} />
      </div>
    </div>
  )
}

export default UseMemo
