import { Planet } from '@/models'
import { doGetPlanet } from '@/services'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type PlanetsStore = {
  isLoading: boolean
  planet: Planet
  loadPlanet: ({ id }: { id: string | number }) => Promise<void>
}

export const usePlanetStore = create<PlanetsStore>()(
  devtools(
    (set) => ({
      isLoading: false,
      Planet: {
        name: '',
        rotationPeriod: '',
        orbitalPeriod: '',
        diameter: '',
        climate: '',
        gravity: '',
        terrain: '',
        surfaceWater: '',
        population: '',
        residents: [],
        films: [],
        url: '',
      },
      loadPlanet: ({ id }) => {
        set({ isLoading: true })
        return Promise.resolve()
          .then(() => doGetPlanet({ url: `https://swapi.dev/api/planet/${id}` }))
          .then((planet) => set({ planet }))
          .finally(() => set({ isLoading: false }))
      },
    }),
    { name: 'planet-store' },
  ),
)
