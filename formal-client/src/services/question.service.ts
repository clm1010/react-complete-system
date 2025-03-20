import { apiClient } '@/lib/api/client'

export const QuestionService = {
  async submitQuestion(id: string) {
    return apiClient.post(`/question/${id}`)
  },
}