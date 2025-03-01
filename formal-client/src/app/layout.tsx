import type { Metadata } from 'next'
// google 字体
import {
  // Geist,
  // Geist_Mono,
  EB_Garamond
} from 'next/font/google'
import './globals.css'

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
  title: 'My Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${ebGaramond.className} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
