'use client'

import { CardLoading, CardCharacter } from '@/components'
import { useCharactersStore } from '@/store'
import { useEffect } from 'react'

export default function Characters() {
  const array = new Array(10).fill(0)

  const loadCharacters = useCharactersStore((state) => state.loadCharacters)
  const isLoading = useCharactersStore((state) => state.isLoading)
  const characters = useCharactersStore((state) => state.characters)

  useEffect(() => {
    loadCharacters()
  }, [loadCharacters])

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
      {characters.map((props, index) => (
        <CardCharacter key={index} {...props} />
      ))}
    </main>
  )
}
