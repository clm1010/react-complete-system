/**
 * 问卷表单组件
 * 集成表单验证和提交状态
 */

'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { submitSurvey } from '@/actions/survey.actions'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { GENDER_OPTIONS } from '@/constants/survey.constants'

export const SurveyForm = () => {
  const router = useRouter()
  const [state, action , isPending ] = useActionState(submitSurvey, null)
  console.log(state, 'state');
  // 提交成功后跳转
  useEffect(() => {
    if (state?.success) {
      console.log('1231233333333333333333333333333333');
      router.push('/success')
    }
  }, [state, router])

  return (
    <form
      action={action}
      className='space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'
    >
      {/* 标题字段 */}
      <FormField label='问卷标题' name='title' required error={state?.error} />

      {/* 性别选择 */}
      <FormField
        label='性别'
        name='gender'
        as='select'
        options={GENDER_OPTIONS}
      />

      {/* 内容输入 */}
      <FormField
        label='详细内容'
        name='content'
        as='textarea'
        rows={4}
        className='min-h-[120px]'
      />

      {/* 提交按钮 */}
      <Button
        type='submit'
        disabled={isPending}
        aria-disabled={isPending}
        className='w-full py-3 text-lg'
      >
        {isPending ? '提交中...' : '提交问卷'}
      </Button>

      {/* 错误提示 */}
      {state?.error && (
        <p className='text-red-500 text-sm mt-2'>{state.error}</p>
      )}
    </form>
  )
}
