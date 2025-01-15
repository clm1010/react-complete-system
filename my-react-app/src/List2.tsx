import type { FC } from 'react'
import { useState, useEffect } from 'react'
import QuestionCard from './components/QuestionCard'
import { produce } from 'immer'

const List2: FC = () => {
  // 组件初次渲染之后，useEffect 执行内部函数
  useEffect(() => {
    console.log('加载 ajax 网络请求！')
  }, [])

  // const [count, setCount] = useState(0)

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

  // useEffect(() => {
  //   console.log('questionList 发生变化！')
  // }, [questionList])
  // useEffect(() => {
  //   console.log('count 发生变化！')
  // }, [count])

  /**
   * @description 新增问卷
   */
  const handlerAddClick = () => {
    // setCount(count + 1)
    const ln = Math.random().toString().slice(-3)
    // setQuestionList(
    //   questionList.concat({
    //     id: 'q' + ln,
    //     title: '问卷' + ln,
    //     isPublished: false
    //   })
    // )
    // 使用 immer 的写法，操作新增
    setQuestionList(
      produce((draft) => {
        draft.push({
          id: 'q' + ln,
          title: '问卷' + ln,
          isPublished: false
        })
      })
    )
  }

  /**
   * @description 父组件删除
   * @param id
   */
  const deleteQuestion = (id: string) => {
    // setQuestionList(
    //   // 删除 filter 过滤 返回新数组
    //   questionList.filter((question) => {
    //     if (question.id === id) return false
    //     else return true
    //   })
    // )

    // 使用 immer 的写法，操作删除
    setQuestionList(
      produce((draft) => {
        const index = draft.findIndex((q) => q.id === id)
        draft.splice(index, 1)
      })
    )
  }

  /**
   * @description 父组件发布
   * @param id
   */
  const publishQuestion = (id: string) => {
    // setQuestionList(
    //   // 修改用 map，返回新数组
    //   questionList.map((question) => {
    //     if (question.id !== id) return question
    //     return { ...question, isPublished: true }
    //   })
    // )

    // 使用 immer 的写法，操作发布
    setQuestionList(
      produce((draft) => {
        const item = draft.find((q) => q.id === id)
        if (item) item.isPublished = true
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
