'use client'
import Link from 'next/link'

import Image from 'next/image'

import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()
  const activeClass = 'font-black underline underline-offset-8'

  return (
    <header className="flex items-center justify-between bg-neutral-900 px-6 py-6 text-gray-400 shadow-md">
      <Link href="/" className="mr-3">
        <Image src="/logo.png" alt="Star Dex" width={195} height={122} />
      </Link>

      <nav className="justify-right flex">
        <ul className="text-md flex gap-6 md:text-lg">
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
