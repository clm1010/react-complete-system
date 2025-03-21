/**
 * 问卷详情页（动态路由）
 * 展示单个问卷的完整信息
 */

import { notFound } from 'next/navigation'
import { api } from '@/lib/api'

export default async function SurveyDetailPage({
  params
}: {
  params: { id: string }
}) {
  // 获取单个问卷数据
  const { data: survey, error } = await api.surveys.get(params.id)

  // 处理未找到情况
  if (error || !survey) return notFound()

  return (
    <div className='max-w-3xl mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-xl font-semibold mb-4'>{survey.title}</h2>

      <div className='space-y-3'>
        <div>
          <label className='text-gray-600'>性别:</label>
          <span className='ml-2'>{survey.gender}</span>
        </div>

        <div>
          <label className='text-gray-600'>提交时间:</label>
          <span className='ml-2'>
            {new Date(survey.createdAt).toLocaleString()}
          </span>
        </div>

        <div className='mt-4'>
          <label className='block text-gray-600 mb-2'>详细内容:</label>
          <p className='whitespace-pre-wrap bg-gray-50 p-4 rounded'>
            {survey.content}
          </p>
        </div>
      </div>
    </div>
  )
}
