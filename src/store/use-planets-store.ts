import { Planets } from '@/models'
import { doGetPlanets } from '@/services'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type PlanetsStore = Pick<Planets, 'total' | 'planets' | 'nextPage' | 'previousPage'> & {
  isLoading: boolean
  loadPlanets: (params?: { page?: number; search?: string }) => Promise<void>
}

export const usePlanetsStore = create<PlanetsStore>()(
  devtools(
    (set) => ({
      isLoading: false,
      total: 0,
      planets: [],
      nextPage: null,
      previousPage: null,
      loadPlanets: (params) => {
        set({ isLoading: true })
        return Promise.resolve()
          .then(() => doGetPlanets(params))
          .then(({ previousPage, nextPage, planets, total }) =>
            set({
              previousPage,
              nextPage,
              planets,
              total,
            }),
          )
          .finally(() => set({ isLoading: false }))
      },
    }),
    { name: 'planets-store' },
  ),
)
