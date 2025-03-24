import QuestionForm from '@/components/QuestionForm'

interface PageProps {
  params: {
    id: string
  }
}

/**
 * @description question 动态路由页面
 * @param props  动态路由参数
 */
export default async function Page(props: PageProps) {
  const { id } = await props.params
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <p>Question</p>
      <QuestionForm id={id} />
    </div>
  )
}
