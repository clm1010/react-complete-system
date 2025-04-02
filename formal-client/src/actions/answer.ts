'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
// 引入服务层的函数
import answerService from '@/services/answer.service'

interface QuestionFormState {
  errors: {
    message?: string
  }
  success?: boolean
}

export async function QuestionAnswerForm(
  questionId: string,
  prevState: QuestionFormState,
  formData: FormData
): Promise<QuestionFormState> {
  try {
    // const rawFormData = Object.fromEntries(formData)
    // console.log(questionId, 'questionId')
    // console.log(rawFormData, 'rawFormData')
    const C1 = formData.get('c1')
    const C2 = formData.get('c2')

    const answerInfo = {
      questionId,
      answerList: [
        {
          componentId: 'c1',
          value: C1
        },
        {
          componentId: 'c2',
          value: C2
        }
      ]
    }
    console.log(answerInfo, 'answerInfo')
    // --- 调用 Service ---
    const data = await answerService.postAnswer(answerInfo)
    console.log(data, 'newAnswer')
  } catch (error) {
    if (error instanceof Error) {
      return { ...prevState, errors: { message: error.message } }
    }
    return { ...prevState, errors: { message: 'Something went wrong' } }
  }
  // throw new Error('Something went wrong')
  // 重新验证清除缓存，渲染
  revalidatePath('/')
  // redirect('/success')

  return {
    errors: {},
    success: true
  }
}
