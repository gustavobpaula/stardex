'use client'
import Link from 'next/link'

import Image from 'next/image'

import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()
  const activeClass = 'font-black underline underline-offset-8'

  return (
    <header className="bg-background flex items-center justify-between px-6 py-4 shadow-md">
      <Link href="/">
        <Image src="/logo.png" alt="Star Dex" width={195} height={122} layout="responsive" />
      </Link>

      <nav className="flex grow-1 justify-center">
        <ul className="flex gap-6 text-lg">
          <li>
            <Link href="/" className={pathname === '/' ? activeClass : ''}>
              Characters
            </Link>
          </li>
          <li>
            <Link href="/planets" className={pathname === '/planets' ? activeClass : ''}>
              Planets
            </Link>
          </li>
          <li>
            <Link href="/favorites" className={pathname === '/favorites' ? activeClass : ''}>
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
