'use client'

import { usePlanetStore, PlanetsStore } from '@/store'
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
export const InitializerPlanetStore = ({ planet }: Pick<PlanetsStore, 'planet'>) => {
  const isInitialized = useRef(false)

  if (!isInitialized.current) {
    usePlanetStore.setState({ planet })
    isInitialized.current = true
  }

  return null
}
