import type { FC } from 'react'
import QuestionCard from './components/QuestionCard'
// TS 类型
const List1: FC = () => {
  const questionList = [
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
  ]

  return (
    <div>
      <h1>问卷列表页</h1>
      <div>
        {questionList.map((question) => {
          // 第二种写法
          // const { id } = question
          const { id, title, isPublished } = question
          return (
            <QuestionCard
              key={id}
              id={id}
              title={title}
              isPublished={isPublished}
            />
          )
          // 第二种写法
          // return <QuestionCard key={id} {...question} />
        })}
      </div>
    </div>
  )
}

export default List1
