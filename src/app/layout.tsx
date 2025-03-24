import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header/Header'

export const metadata: Metadata = {
  title: 'StarDex - Explore the Star Wars Universe',
  description:
    'Discover characters and planets from the Star Wars universe with detailed information.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
