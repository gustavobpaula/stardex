'use client'

import { doGetCharacters } from '@/services'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    doGetCharacters({ search: 'skywalker' }).then((response) => {
      console.log('responde', response)
    })
  }, [])

  return <h1>Teste</h1>
}
