// app/components/QuestionnaireListApiClient.tsx
'use client' // 标记为客户端组件

import React, { useState, useEffect } from 'react'
import type { Questionnaire } from '@/types/questionnaire' // 引入类型

export function QuestionnaireListApiClient() {
  // State for storing questionnaires, loading status, and errors
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true) // Start in loading state
  const [error, setError] = useState<string | null>(null)

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      setIsLoading(true) // Set loading true before fetch
      setError(null) // Reset error state

      try {
        console.log('ApiClient: Fetching data from /api/questionnaires...')
        // --- 调用 Next.js 内部 API 路由 ---
        const response = await fetch('/api/questionnaires', {
          method: 'GET',
          cache: 'no-store' // Ensure fresh data for client-side fetch too
        })
        // --- API 路由调用结束 ---

        console.log('ApiClient: Received response status:', response.status)

        // Check if the fetch was successful
        if (!response.ok) {
          // Try to parse error message from response body if available
          let errorMsg = `API request failed with status ${response.status}`
          try {
            const errorData = await response.json()
            errorMsg = errorData.message || errorMsg
          } catch (parseError) {
            // Ignore if response body isn't valid JSON
            console.error(
              'ApiClient: Failed to parse error message:',
              parseError
            )
          }
          throw new Error(errorMsg)
        }

        // Parse the JSON response
        const data: Questionnaire[] = await response.json()
        console.log('ApiClient: Fetched data:', data)
        setQuestionnaires(data) // Update state with fetched data
      } catch (err: any) {
        console.error('ApiClient: Error fetching questionnaires:', err)
        setError(err.message || 'An unknown error occurred.') // Update error state
        setQuestionnaires([]) // Clear any previous data on error
      } finally {
        setIsLoading(false) // Set loading false after fetch completes (success or error)
      }
    }

    // Call the fetch data function
    fetchData()

    // Empty dependency array [] means this effect runs only once when the component mounts
  }, [])

  // Render logic based on state
  return (
    <div
      style={{
        marginTop: '30px',
        border: '1px dashed blue',
        padding: '15px',
        background: '#eef'
      }}
    >
      <h2>Questionnaires (Fetched by Client Component via /api Route)</h2>

      {/* Display loading message */}
      {isLoading && <p>Loading questionnaires from API route...</p>}

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display list if loaded successfully and not empty */}
      {!isLoading && !error && questionnaires.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {questionnaires.map((q) => (
            <li
              key={q.id}
              style={{
                background: '#fff',
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '4px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <strong style={{ color: 'blue' }}>
                {q.title} (ID: {q.id}) - Client Fetched
              </strong>
              <p style={{ margin: '5px 0 0 0' }}>{q.content}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Display message if loaded successfully but list is empty */}
      {!isLoading && !error && questionnaires.length === 0 && (
        <p>No questionnaires found via API route.</p>
      )}
    </div>
  )
}
