/**
 * 问卷列表页
 * 展示所有已提交问卷的概要信息
 */

import Link from 'next/link'
import { api } from '@/lib/api'

export default async function SurveyListPage() {
  // 获取问卷数据
  const { data: surveys } = await api.surveys.getAll()

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-xl font-semibold mb-6'>历史问卷列表</h2>

      <div className='space-y-4'>
        {surveys?.map(
          //eslint-disable-next-line
          (survey: any) => (
            <article
              key={survey.id}
              className='bg-white p-4 rounded shadow hover:shadow-md transition-shadow'
            >
              <Link href={`/survey/${survey.id}`}>
                <h3 className='text-lg font-medium'>{survey.title}</h3>
                <div className='mt-2 text-sm text-gray-600'>
                  <span className='mr-4'>性别: {survey.gender}</span>
                  <time>{new Date(survey.createdAt).toLocaleDateString()}</time>
                </div>
              </Link>
            </article>
          )
        )}

        {!surveys?.length && (
          <div className='text-center py-8 text-gray-500'>暂无历史问卷</div>
        )}
      </div>
    </div>
  )
}
