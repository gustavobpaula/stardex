'use client'

import { usePlanetStore, PlanetsStore } from '@/store'
import { useRef } from 'react'

export const InitializerPlanetStore = ({ planet }: Pick<PlanetsStore, 'planet'>) => {
  const isInitialized = useRef(false)

  if (!isInitialized.current) {
    usePlanetStore.setState({ planet })
    isInitialized.current = true
  }

  return null
}
