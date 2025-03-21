/**
 * 自定义API Hook
 * 封装数据获取逻辑（示例）
 */

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { SurveyData } from '@/types/survey'

export const useSurvey = (id: string) => {
  const [data, setData] = useState<SurveyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.surveys.get(id)
        if (response.success) {
          setData(response.data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return { data, loading, error }
}
