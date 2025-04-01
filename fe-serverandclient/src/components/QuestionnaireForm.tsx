// app/components/QuestionnaireForm.tsx
'use client' // 标记为客户端组件，因为它使用了 Hook (useActionState, useState, useEffect)

import React, { useActionState, useEffect } from 'react'
import {
  submitQuestionnaire
  // initialState,
  // type FormState // 导入类型
} from '@/app/actions/questionnaireActions' // 引入 Server Action 和初始状态

// 定义 Props 类型 (如果需要从父组件接收数据)
interface QuestionnaireFormProps {
  questionnaireId?: string // 示例：可以用来预填表单或区分操作
}

export function QuestionnaireForm({ questionnaireId }: QuestionnaireFormProps) {
  // React 19 的 useActionState Hook
  // 参数：Server Action, 初始状态
  // 返回：[当前状态, 表单提交函数, 是否挂起(pending)]
  const [state, formAction, isPending] = useActionState(
    submitQuestionnaire, // 要执行的 Server Action
    {
      message: '',
      errors: { title: [], content: [] },
      success: false
    } // Action 的初始状态
  )

  // 可以在这里使用 useEffect 监听 state.success 或 state.message 的变化来执行副作用
  // 例如显示 toast 通知，但重定向由 Server Action 处理
  useEffect(() => {
    if (state.message && !state.success) {
      // 可以在这里显示错误提示，例如使用 toast 库
      console.error('Form Error:', state.message, state.errors)
    }
    // 成功状态通常由 Server Action 中的 redirect 处理，客户端不需要额外操作
  }, [state])

  return (
    // 使用 formAction 作为 form 的 action 属性
    // 当表单提交时，会自动调用 submitQuestionnaire 这个 Server Action
    <form action={formAction}>
      <h2>
        Submit Questionnaire {questionnaireId ? `(ID: ${questionnaireId})` : ''}
      </h2>

      {/* 显示来自 Server Action 的通用错误消息 */}
      {state?.message && !state.success && (
        <p className='error-message'>Error: {state.message}</p>
      )}
      {/* 显示特定于服务器或网络连接的错误 */}
      {state?.errors?.server && (
        <p className='error-message'>Server Error: {state.errors.server}</p>
      )}

      {/* 标题输入 */}
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title' // name 属性必须与 Server Action 中 formData.get() 的键匹配
          required
          minLength={3} // 客户端基础验证
          aria-describedby={state?.errors?.title ? 'title-error' : undefined}
        />
        {/* 显示标题字段的验证错误 */}
        {state?.errors?.title && (
          <div id='title-error' className='error-message'>
            {state.errors.title.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>

      {/* 内容输入 */}
      <div>
        <label htmlFor='content'>Content:</label>
        <textarea
          id='content'
          name='content' // name 属性必须与 Server Action 中 formData.get() 的键匹配
          required
          minLength={10} // 客户端基础验证
          aria-describedby={
            state?.errors?.content ? 'content-error' : undefined
          }
        />
        {/* 显示内容字段的验证错误 */}
        {state?.errors?.content && (
          <div id='content-error' className='error-message'>
            {state.errors.content.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>

      {/* 提交按钮 */}
      <button type='submit' disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Questionnaire'}
      </button>
    </form>
  )
}
