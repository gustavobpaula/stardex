import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'

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
      <body className={`dark flex min-h-screen flex-col antialiased`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
