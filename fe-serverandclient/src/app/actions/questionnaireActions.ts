// app/actions/questionnaireActions.ts
'use server' // 标记这是一个 Server Action 模块

import { redirect } from 'next/navigation'
// 引入服务层的函数
import questionnaireService from '@/services/questionnaireService'
// 引入类型定义
import type { QuestionnaireCreateData } from '@/types/questionnaire'

// 定义 Server Action 的状态类型 (保持不变)
// export type FormState = {
//   message: string
//   errors?: {
//     title?: string[]
//     content?: string[]
//     server?: string // 用于后端、服务或网络错误
//   }
//   success: boolean
// }

// 初始状态 (保持不变)
interface FormState {
  message: string
  errors?: {
    title?: string[]
    content?: string[]
    server?: string // 用于后端、服务或网络错误
  }
  success: false
}

/**
 * Server Action for submitting the questionnaire form.
 * Now uses the questionnaireService to interact with the backend.
 *
 * @param prevState The previous state from useActionState.
 * @param formData The FormData object from the form submission.
 * @returns The new state for the form.
 */
export async function submitQuestionnaire(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('Server Action: submitQuestionnaire triggered')

  // 1. 从 FormData 提取数据
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // 2. 服务端验证 (基本示例)
  const errors: FormState['errors'] = {}
  if (!title || title.trim().length < 3) {
    errors.title = ['Title must be at least 3 characters long.']
  }
  if (!content || content.trim().length < 10) {
    errors.content = ['Content must be at least 10 characters long.']
  }

  // 如果有验证错误，立即返回错误状态
  if (Object.keys(errors).length > 0) {
    console.log('Action: Validation errors:', errors)
    return {
      message: 'Validation failed. Please check the fields.',
      errors,
      success: false
    }
  }

  // 3. 调用服务层创建问卷
  try {
    const dataToSubmit: QuestionnaireCreateData = { title, content }
    console.log(
      'Action: Calling questionnaireService.createQuestionnaire with:',
      dataToSubmit
    )

    // --- 调用 Service ---
    const newQuestionnaire = await questionnaireService.createQuestionnaire(
      dataToSubmit
    )
    // --- Service 调用结束 ---

    console.log(
      'Action: Questionnaire created successfully by service:',
      newQuestionnaire
    )

    // 4. 处理成功响应 - 重定向到成功页面
    // 注意：重定向必须在 try...catch 块之外调用，或者确保它是最后的操作
  } catch (error: any) {
    // 5. 处理来自 Service 层或 fetchApi 的错误
    console.error('Action: Error submitting questionnaire via service:', error)
    // 尝试获取更具体的错误信息
    const errorMessage =
      error.message || 'Could not submit questionnaire due to a server error.'
    return {
      message: `Submission failed: ${errorMessage}`,
      // 可以尝试从 error 对象中获取更详细的错误分类
      errors: { server: errorMessage },
      success: false
    }
  }

  // 6. 如果 Service 调用成功，执行重定向
  // redirect() 会抛出一个特殊错误，由 Next.js 捕获以执行重定向
  console.log('Action: Redirecting to /success')
  redirect('/success')

  // --- 这部分代码在 redirect() 之后不会执行 ---
  // return {
  //   message: 'Submission successful! Redirecting...',
  //   success: true,
  // };
}
