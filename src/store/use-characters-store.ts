import { Characters } from '@/models'
import { doGetCharacters } from '@/services'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CharactersStore = Pick<Characters, 'total' | 'characters' | 'nextPage' | 'previousPage'> & {
  isLoading: boolean
  loadCharacters: (params?: { page?: number; search?: string }) => Promise<void>
}

export const useCharactersStore = create<CharactersStore>()(
  devtools(
    (set) => ({
      isLoading: false,
      total: 0,
      characters: undefined,
      nextPage: null,
      previousPage: null,
      loadCharacters: (params) => {
        set({ isLoading: true })
        return Promise.resolve()
          .then(() => doGetCharacters(params))
          .then(({ previousPage, nextPage, characters, total }) =>
            set({
              previousPage,
              nextPage,
              characters,
              total,
            }),
          )
          .finally(() => set({ isLoading: false }))
      },
    }),
    { name: 'characters-store' },
  ),
)
