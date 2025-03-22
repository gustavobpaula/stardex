'use client'

import { doGetPlanets } from '@/services'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    doGetPlanets().then((response) => {
      console.log('responde', response)
    })
  }, [])

  return <h1>Teste</h1>
}
