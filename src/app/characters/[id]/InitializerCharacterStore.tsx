'use client'

import { useCharacterStore, CharactersStore } from '@/store'
import { useRef } from 'react'

export const InitializerCharacterStore = ({ character }: Pick<CharactersStore, 'character'>) => {
  const isInitialized = useRef(false)

  if (!isInitialized.current) {
    useCharacterStore.setState({ character })
    isInitialized.current = true
  }

  return null
}
