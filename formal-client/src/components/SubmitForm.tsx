'use client'
// React 19.0.0 以后 使用 useActionState
import { useActionState } from 'react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import QuestionInput from '@components/QuestionComponents/QuestionInput'
import QuestionRadio from '@components/QuestionComponents/QuestionRadio'
import * as actions from '@/actions'
import SubmitButton from '@/components/SubmitButton'

const initialState = {
  errors: { message: '' }
}

interface PropsType {
  id: string
}
export default function SubmitForm(props: PropsType) {
  const { id } = props
  const [state, questionAnswerAction, isPending] = useActionState(
    actions.postAnswerForm.bind(null, id),
    initialState
  )

  // if (state.errors.message === '' ) {
  //   revalidatePath('/success')
  //   console.log(123123123);
  //   redirect('/success')
  // }

  return (
    <>
      <p>SubmitForm {id}</p>
      <form action={questionAnswerAction}>
        {/* <input type='hidden' name='questionId' value={id} /> */}
        <div className='border-b-2 border-solid border-gray-200'>
          <QuestionInput
            fe_id='c1'
            props={{ title: '你的姓名', placeholder: '请输入姓名...' }}
          />
        </div>
        <div className='border-b-2 border-solid border-gray-200'>
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
        <div className='border-b-2 border-solid border-gray-200'>
          <div className='w-4/12 mt-4 mb-auto mr-auto ml-auto border-solid border-2 border-gray-200 hover:border-blue-400 focus:border-blue-200 focus:outline-none rounded-md p-1.5 bg-blue-600'>
            <SubmitButton isPending={isPending} />
          </div>
        </div>
      </form>
      {state.errors.message && (
        <p className='my-2 p-2 bg-red-200 border rounded border-red-400 '>
          {state.errors.message}
        </p>
      )}
    </>
  )
}
