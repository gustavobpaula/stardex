import Link from 'next/link'

import Image from 'next/image'

export const Header = () => {
  return (
    <header className="bg-background flex items-center justify-between px-6 py-4 shadow-md">
      <Link href="/">
        <Image src="/logo.png" alt="Star Dex" width={195} height={122} layout="responsive" />
      </Link>

      <nav>
        <ul className="flex gap-6 text-lg">
          <li>
            <Link href="/">Characters</Link>
          </li>
          <li>
            <Link href="/planets">Planets</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
