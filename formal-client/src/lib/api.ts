const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const fetcher = async <T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    ...options
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

export const api = {
  surveys: {
    // create: (data: Omit<Survey.Data, 'id' | 'createdAt'>) =>
    //   fetcher<Survey.ApiResponse>('/api/surveys', {
    //     method: 'POST',
    //     body: JSON.stringify(data)
    //   }),
    get: (id: string) => fetcher<Survey.ApiResponse>(`/api/surveys/${id}`)
  }
}
