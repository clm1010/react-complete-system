import type { CSSProperties } from 'react'

interface QuestionTitlePropsType {
  // 不需要 fe_id
  text: string
  level: string
  isCenter?: boolean
}

export default function QuestionTitle({
  text,
  level,
  isCenter
}: QuestionTitlePropsType) {
  console.log(text, level, isCenter)

  const style: CSSProperties = {}
  if (isCenter) {
    style.textAlign = 'center'
  }

  if (level == '1') return <h1 style={style} className='text-3xl font-bold mb-4'>{text}</h1>
  if (level == '2') return <h2 style={style} className='text-2xl font-bold mb-4'>{text}</h2>
  if (level == '3') return <h3 style={style} className='text-1xl font-bold mb-4'>{text}</h3>

  return null
}
