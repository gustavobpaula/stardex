'use client'

import { useCharacterStore, CharactersStore } from '@/store'
import { useRef } from 'react'

/**
 * InitializerCharacterStore
 *
 * This component ensures the rehydration of the state from the server to the client.
 * It initializes the character state in the client-side store with the data provided
 * from the server-side rendering.
 *
 * @param {Pick<CharactersStore, 'character'>} props - The character data to initialize the store with.
 * @returns {null} This component does not render any UI.
 *
 * Usage:
 * ```tsx
 * <InitializerCharacterStore character={character} />
 * ```
 */
export const InitializerCharacterStore = ({ character }: Pick<CharactersStore, 'character'>) => {
  const isInitialized = useRef(false)

  if (!isInitialized.current) {
    useCharacterStore.setState({ character })
    isInitialized.current = true
  }

  return null
}
