import type { FC } from 'react'
import { useEffect } from 'react'
import '@/components/QuestionCard.css'

// ts 自定义类型
type PropsType = {
  id: string
  title: string
  isPublished: boolean
  deleteQuestion?: (id: string) => void
  publishQuestion?: (id: string) => void
}

// FC 是 functional component 函数组件
const QuestionCard: FC<PropsType> = (props) => {
  const { id, title, isPublished, deleteQuestion, publishQuestion } = props
  /**
   * @description 发布
   * @param id
   */
  const handlerPublish = (id: string) => {
    console.log('发布', id)
    if (publishQuestion) {
      publishQuestion(id)
    }
  }

  /**
   * @description 删除
   * @param id
   */
  const handlerDel = (id: string) => {
    console.log('删除', id)
    if (deleteQuestion) {
      deleteQuestion(id)
    }
  }

  useEffect(() => {
    console.log('question card mounted!')

    return () => {
      console.log('question card unmounted!', `${id}`)
    }
  }, [])

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
          handlerPublish(id)
        }}
      >
        发布问卷
      </button>
      &nbsp;
      <button
        onClick={() => {
          handlerDel(id)
        }}
      >
        删除
      </button>
    </div>
  )
}

export default QuestionCard
