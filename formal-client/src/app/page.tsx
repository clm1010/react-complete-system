import { Button, Link } from '@heroui/react'
/**
 * 首页组件
 * 展示问卷提交表单和入口导航
 */

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1>问卷调查</h1>
      <Button color='secondary' as={Link} href='/question/123'>
        开始问卷
      </Button>
    </div>
  )
}
