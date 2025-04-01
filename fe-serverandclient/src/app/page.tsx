// app/page.tsx
import { Button, Link } from '@heroui/react'
// 引入服务层和类型
import questionnaireService from '@/services/questionnaireService'
import type { Questionnaire } from '@/types/questionnaire'
// --- 新增: 引入客户端组件 ---
import { QuestionnaireListApiClient } from '@/components/QuestionnaireListApiClient'

// 页面现在是 Server Component (默认)，可以直接 await 数据获取
export default async function HomePage() {
  // --- 数据获取 (Server Component 直接调用 Service) ---
  let serverFetchedQuestionnaires: Questionnaire[] = []
  let serverFetchError: string | null = null
  try {
    console.log(
      'HomePage (Server Component): Fetching questionnaires via Service...'
    )
    serverFetchedQuestionnaires = await questionnaireService.getQuestionnaires()
    console.log(
      'HomePage (Server Component): Fetched questionnaires via Service:',
      serverFetchedQuestionnaires.length
    )
  } catch (error: any) {
    console.error(
      'HomePage (Server Component): Failed to fetch questionnaires via Service:',
      error
    )
    serverFetchError =
      error.message || 'Could not load questionnaires via service.'
  }
  // --- Server Component 数据获取结束 ---

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1>Welcome to the Questionnaire App</h1>

      <Button color='secondary' as={Link} href='/questionnaire/new'>
        Submit a New Questionnaire
      </Button>

      <hr style={{ margin: '20px 0' }} />

      {/* --- Section 1: 数据由 Server Component 直接调用 Service 获取 --- */}
      <div>
        <h2>
          Existing Questionnaires (Fetched by Server Component via Service)
        </h2>
        {serverFetchError && (
          <p style={{ color: 'red' }}>
            Error loading data via service: {serverFetchError}
          </p>
        )}
        {!serverFetchError && serverFetchedQuestionnaires.length === 0 && (
          <p>No questionnaires found via service.</p>
        )}
        {!serverFetchError && serverFetchedQuestionnaires.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {serverFetchedQuestionnaires.map((q) => (
              <li
                key={q.id}
                style={{
                  background: '#fff',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <h3 style={{ marginTop: 0 }}>
                  {q.title} (ID: {q.id})
                </h3>
                <p>{q.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* --- Section 1 End --- */}

      {/* --- Section 2: 数据由 Client Component 调用 /api 路由获取 --- */}
      {/* 这里渲染我们新创建的客户端组件 */}
      <QuestionnaireListApiClient />
      {/* --- Section 2 End --- */}
    </div>
  )
}
