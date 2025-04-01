import type { Metadata } from 'next'
import {
  // Geist,
  // Geist_Mono,
  EB_Garamond
} from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="zh-CN">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${ebGaramond.className} antialiased`}
      >
        <Providers>
          <Header />
          <div style={{ height: 'calc(100vh - 128px)' }}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
