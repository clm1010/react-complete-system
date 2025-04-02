'use client'
import { useActionState, startTransition, useRef, useEffect } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Button
} from '@heroui/react'

import QuestionInput from '@components/QuestionComponents/QuestionInput'
import QuestionRadio from '@components/QuestionComponents/QuestionRadio'
import { QuestionAnswerForm } from '@/actions/index'

interface PropsType {
  id: string
  componentList: Array<any> // 组件
}

export default function QuestionForm(props: PropsType) {
  const { id, componentList } = props
  const [state, formAction, isPending] = useActionState(
    QuestionAnswerForm.bind(null, id),
    {
      errors: {}
    }
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    startTransition(() => formAction(formData))
  }

  const formRef = useRef<HTMLFormElement | null>(null)
  // 处理表单重置
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <Card className='w-full max-w-sm dark:border-1 dark:border-solid dark:border-purple-900 dark:text-gray-200'>
      <CardHeader>Question Form {id}</CardHeader>
      <CardBody>
        <Form
          className='w-full flex flex-col gap-4'
          ref={formRef}
          onSubmit={handleSubmit}
          validationBehavior='aria'
        >
          <div className='w-full border-b-2 border-solid border-gray-200 dark:border-purple-800'>
            <QuestionInput
              fe_id='c1'
              props={{ title: '你的姓名', placeholder: '请输入姓名...' }}
            />
          </div>
          <div className='w-full border-b-2 border-solid border-gray-200 dark:border-purple-800'>
            <QuestionRadio
              fe_id='c2'
              props={{
                title: '你的性别',
                options: [
                  { value: 'male', text: '男' },
                  { value: 'female', text: '女' }
                ],
                value: 'male',
                isVertical: false
              }}
            />
          </div>
          <div className='w-full'>
            <Button
              className='w-full'
              color='secondary'
              type='submit'
              isLoading={isPending}
            >
              提交
            </Button>
          </div>
        </Form>
      </CardBody>
      <CardFooter>
        {state.errors.message && (
          <div className='text-red-500'>{state.errors.message}</div>
        )}
        {state.success && <div className='text-green-500'>提交成功</div>}
      </CardFooter>
    </Card>
  )
}
