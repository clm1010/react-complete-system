import SubmitForm from '@/components/SubmitForm'

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
  //NextJS 15.0.0 版本之后获取动态路由参数，需要使用 await
  const { id } = await props.params

  return (
    <div>
      <p>Question {id}</p>
      <SubmitForm id={id} />
    </div>
  )
}
