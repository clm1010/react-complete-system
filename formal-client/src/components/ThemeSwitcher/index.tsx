'use client'
import { Spinner } from '@heroui/react'
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
      <div className='flex'>
        <Spinner color='secondary' size='sm' />
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      onClick={toggleTheme}
      className='w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg hover:bg-default-200 dark:hover:bg-purple-800'
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
