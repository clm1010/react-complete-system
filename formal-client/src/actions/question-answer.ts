'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ApiService } from '@/services/api.service';
// const genAnswerInfo = (reqBody: any) => {
//   let answerList = [] as any

//   Object.keys(reqBody).forEach((key) => {
//     answerList.push({
//       componentId: key,
//       value: reqBody[key]
//     })
//   })
//   return answerList
// }

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

    // const res = await fetch('http://localhost:3000/api/answer', {
    //   method: 'POST',
    //   body: JSON.stringify(answerInfo)
    // })
    // console.log(res, 'res')
  } catch (error) {
    if (error instanceof Error) {
      return { ...prevState, errors: { message: error.message } }
    }
    return { ...prevState, errors: { message: 'Something went wrong' } }
  }
  // throw new Error('Something went wrong')
  // 重新验证清除缓存，渲染
  revalidatePath('/')
  redirect('/success')

  // return {
  //   errors: {},
  //   success: true
  // }
}
