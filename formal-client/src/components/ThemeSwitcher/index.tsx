'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, SunMoon } from 'lucide-react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        aria-label='Loading theme'
        className='w-8 h-8 flex justify-center items-center rounded-lg bg-transparent'
      >
        <div className='h-4 w-4 rounded-full animate-pulse bg-red-400' />
      </button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      onClick={toggleTheme}
      className='w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg hover:bg-default-200 dark:hover:bg-purple-800'
      // onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      // className='w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg hover:bg-default-200 dark:hover:bg-purple-800 transition-colors'
      aria-label={`Toggle ${theme} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <SunMoon size={20} className='dark:text-gray-200' />
      )}
    </div>
  )
}
