'use client'

import { doGetCharacters } from '@/services'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    doGetCharacters()
      .then((response) => {
        console.log(response)
      })
      .then(() => {
        doGetCharacters({ page: 2 }).then((response) => {
          console.log(response)
        })
      })
  }, [])

  return <h1>Teste</h1>
}
