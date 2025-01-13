import type { FC } from 'react'
import { useState } from 'react'
import QuestionCard from '@/components/QuestionCard'

const List2: FC = () => {
  // 原始数据保存在useState
  const [questionList, setQuestionList] = useState([
    {
      id: 'q1',
      title: '问卷1',
      isPublished: false
    },
    {
      id: 'q2',
      title: '问卷2',
      isPublished: true
    },
    {
      id: 'q3',
      title: '问卷3',
      isPublished: false
    },
    {
      id: 'q4',
      title: '问卷4',
      isPublished: true
    }
  ])

  /**
   * @description 新增问卷
   */
  const handlerAddClick = () => {
    const ln = Math.random().toString().slice(-3)
    setQuestionList(
      questionList.concat({
        id: 'q' + ln,
        title: '问卷' + ln,
        isPublished: false
      })
    )
  }

  /**
   * @description 父组件删除
   * @param id
   */
  const deleteQuestion = (id: string) => {
    setQuestionList(
      // 删除 filter 过滤 返回新数组
      questionList.filter((question) => {
        if (question.id === id) return false
        else return true
      })
    )
  }

  /**
   * @description 父组件发布
   * @param id
   */
  const publishQuestion = (id: string) => {
    setQuestionList(
      // 修改用 map，返回新数组
      questionList.map((question) => {
        if (question.id !== id) return question
        return { ...question, isPublished: true }
      })
    )
  }

  return (
    <div>
      <h1>问卷列表页2</h1>
      <div>
        {questionList.map((question) => {
          return (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              isPublished={question.isPublished}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
            ></QuestionCard>
          )
        })}
      </div>
      <div>
        <button onClick={handlerAddClick}>新建问卷</button>
      </div>
    </div>
  )
}

export default List2
