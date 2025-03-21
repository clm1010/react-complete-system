import type { Metadata } from 'next'
// google 字体
import {
  // Geist,
  // Geist_Mono,
  EB_Garamond
} from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import Link from 'next/link'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin']
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin']
// })

const ebGaramond = EB_Garamond({
  // variable: '--font-inter-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export const metadata: Metadata = {
  title: '问卷调查系统',
  description: '新一代在线问卷收集解决方案',
  keywords: ['问卷', '调查', '数据收集']
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-CN' className='dark'>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${ebGaramond.className} antialiased`}
      >
        <main className='container mx-auto p-4'>
          {/* 导航栏 */}
          <nav className='mb-8 border-b pb-4'>
            <h1 className='text-2xl font-bold text-blue-600'>
              <Link href='/'>问卷系统</Link>
            </h1>
          </nav>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
