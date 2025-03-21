// app/success/page.tsx
/**
 * 提交成功页
 * 显示成功反馈和导航
 */

import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className='max-w-md mx-auto text-center py-20'>
      <h2 className='text-2xl font-semibold mb-4'>提交成功！</h2>
      <p className='text-gray-600 mb-8'>感谢您的参与，问卷已成功提交</p>

      <Link
        href='/'
        className='inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'
      >
        返回首页
      </Link>
    </div>
  )
}
