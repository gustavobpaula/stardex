'use client'

import { CardLoading, CardCharacter } from '@/components'
import { Characters } from '@/models'
import { doGetCharacters } from '@/services'
import { useEffect, useState } from 'react'

export default function Home() {
  const array = new Array(10).fill(0)
  const [characters, setCharacters] = useState<Characters>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    doGetCharacters({})
      .then(setCharacters)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <main className="grid grid-cols-1 gap-4 p-4 align-middle sm:grid-cols-2 lg:grid-cols-4">
        {array.map((_, index) => (
          <CardLoading key={index} />
        ))}
      </main>
    )
  }

  return (
    <main className="grid grid-cols-1 gap-4 p-4 align-middle sm:grid-cols-2 lg:grid-cols-4">
      {characters?.characters.map((props, index) => <CardCharacter key={index} {...props} />)}
    </main>
  )
}
