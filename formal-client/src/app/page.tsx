/**
 * 首页组件
 * 展示问卷提交表单和入口导航
 */

import Link from 'next/link'
import { SurveyForm } from '@/components/forms/SurveyForm'

export default function Home() {
  return (
    <div className='max-w-3xl mx-auto'>
      <div className='bg-white p-6 rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-6'>填写新问卷</h2>
        <SurveyForm />

        {/* 辅助导航 */}
        <div className='mt-8 flex justify-end'>
          <Link href='/survey' className='text-blue-600 hover:underline'>
            查看历史问卷 →
          </Link>
        </div>
      </div>
    </div>
  )
}
