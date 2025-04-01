// app/questionnaire/[id]/page.tsx
import { QuestionnaireForm } from '@/components/QuestionnaireForm'

// 定义页面参数类型
interface PageProps {
  params: {
    id: string // 从动态路由获取的 ID
  }
}

// 这是一个 Server Component (默认)
export default async function QuestionnairePage({ params }: PageProps) {
  const { id } = await params // 获取动态路由参数 id

  // id 可以用于获取特定问卷的模板数据、预填表单等，
  // 但在此示例中，我们仅将其传递给表单组件用于显示。
  // 如果 id === 'new'，可以表示创建新问卷。

  return (
    <div>
      <h1>Questionnaire Submission Page</h1>
      <p>
        You are on the page for questionnaire ID: <strong>{id}</strong>
      </p>
      <p>Fill out the form below:</p>

      {/* 渲染表单组件，并传入 ID */}
      <QuestionnaireForm questionnaireId={id} />
    </div>
  )
}

// (可选) 如果需要基于 ID 生成静态页面或进行特定验证
// export async function generateStaticParams() {
//   // 返回可能的 ID 列表
//   // return [{ id: 'type-a' }, { id: 'type-b' }];
// }
