import type { FC } from 'react'
import './QuestionCard.css'

// ts 自定义类型
type PropsType = {
  id: string
  title: string
  isPublished: boolean
}

// FC 是 functional component 函数组件
const QuestionCard: FC<PropsType> = (props) => {
  const { id, title, isPublished } = props

  const handleEdit = (id: string) => {
    console.log('编辑', id)
  }
  return (
    <div key={id} className='list-item'>
      <strong>{title}</strong>&nbsp;
      {isPublished ? (
        <span style={{ color: 'green' }}>已发布</span>
      ) : (
        <span>未发布</span>
      )}
      &nbsp;
      <button
        onClick={() => {
          handleEdit(id)
        }}
      >
        编辑问卷
      </button>
    </div>
  )
}

export default QuestionCard
