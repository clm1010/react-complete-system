import { Alert } from '@heroui/react'

import QuestionForm from '@/components/QuestionForm'
import questionService from '@/services/question.service'
interface QuestionType {
  errno: number
  data?: {
    id: string
    title: string
    desc?: string
    js?: string
    css?: string
    isPublished: boolean
    isDeleted: boolean
    componentList: Array<any>
  }
  msg?: string
}

interface PageProps {
  params: { id: string }
}
export default async function Page(props: PageProps) {
  const { id: questionId } = await props.params

  if (!questionId) {
    return <div>Question not found</div>
  }
  const resQuestionData = await getQuestion(questionId)
  const { errno, data, msg = '' } = resQuestionData
  // console.log(errno, data, msg)

  // 数据错误
  if (errno !== 0) {
    return (
      <div className='flex flex-col items-center justify-center w-8/12 h-full m-auto'>
        <div className='flex flex-col w-full'>
          <div className='w-full flex items-center my-3'>
            <Alert
              className='flex items-center'
              color='danger'
              title={`错误: ${msg}`}
            />
          </div>
        </div>
      </div>
    )
  }

  const {
    id = '',
    title = '',
    desc = '',
    isDeleted,
    isPublished,
    componentList = []
  } = data || {}
  // 已经被删除的，提示错误
  if (isDeleted) {
    return (
      <div className='flex flex-col items-center justify-center w-8/12 h-full m-auto'>
        <div className='flex flex-col w-full'>
          <div className='w-full flex items-center my-3'>
            <Alert
              className='flex items-center'
              color='danger'
              title={title}
              description={desc}
              endContent={<p color='danger'>该问卷已经被删除！</p>}
            />
          </div>
        </div>
      </div>
    )
  }

  // 尚未发布的，提示错误
  if (!isPublished) {
    return (
      <div className='flex flex-col items-center justify-center w-8/12 h-full m-auto'>
        <div className='flex flex-col w-full'>
          <div className='w-full flex items-center my-3'>
            <Alert
              className='flex items-center'
              color='warning'
              title={title}
              description={desc}
              endContent={<p color='warning'>该问卷尚未发布！</p>}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='flex flex-col items-center justify-center h-full dark:text-gray-200'>
      {/* <p>Question {questionId}</p> */}
      <QuestionForm id={questionId} componentList={componentList} />
    </div>
  )
}

/**
 * @description 获取问卷
 */
async function getQuestion(id: string): Promise<QuestionType> {
  const resData = await questionService.getQuestionById(id)
  // console.log(resData, 'getQuestion')
  return {
    errno: resData.errno,
    data: resData.data
  }
}
