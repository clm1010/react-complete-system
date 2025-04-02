'use client'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      enableColorScheme
      // enableColorScheme={false}
    >
      <HeroUIProvider>{children}</HeroUIProvider>
    </NextThemesProvider>
  )
}
