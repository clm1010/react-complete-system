// app/success/page.tsx
/**
 * 提交成功页
 * 显示成功反馈和导航
 */

import { Button, Link } from '@heroui/react'

export default function SuccessPage() {
  return (
    <div className='max-w-md mx-auto text-center py-20'>
      <h2 className='text-2xl font-semibold mb-4'>提交成功！</h2>
      <p className='text-gray-600 mb-8'>感谢您的参与，问卷已成功提交</p>

      <Button
        color='secondary'
        as={Link}
        href='/'
      >
        返回首页
      </Button>
    </div>
  )
}
