'use client'

import { doGetCharacter } from '@/services'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    doGetCharacter({ url: 'https://swapi.dev/api/people/1/' })
  }, [])

  return <h1>Teste</h1>
}
