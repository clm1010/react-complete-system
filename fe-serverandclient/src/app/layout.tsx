import type { Metadata } from 'next'
import Link from 'next/link'
// google 字体
import {
  // Geist,
  // Geist_Mono,
  EB_Garamond
} from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'

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
    <html lang='zh-CN'>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${ebGaramond.className} antialiased`}
      >
        <Providers>
          <header>
            <nav>
              <Link href='/'>Home</Link>
              {/* 使用一个示例 ID，或者可以链接到一个创建页面 */}
              <Link href='/questionnaire/new'>Submit Questionnaire</Link>
            </nav>
          </header>
          {children}
          <footer>
            <p
              style={{ textAlign: 'center', marginTop: '30px', color: '#888' }}
            >
              © {new Date().getFullYear()} Questionnaire Project
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
