import { Characters } from '@/models'
import { doGetCharacters } from '@/services'
import { create } from 'zustand'

type CharactersStore = Pick<Characters, 'total' | 'characters' | 'nextPage' | 'previousPage'> & {
  isLoading: boolean
  loadCharacters: () => Promise<void>
}

export const useCharactersStore = create<CharactersStore>((set) => ({
  isLoading: false,
  total: 0,
  characters: [],
  nextPage: '',
  previousPage: '',
  loadCharacters: () => {
    set({ isLoading: true })
    return Promise.resolve()
      .then(() => doGetCharacters())
      .then(({ previousPage, nextPage, characters }) =>
        set({
          previousPage,
          nextPage,
          characters,
        }),
      )
      .finally(() => set({ isLoading: false }))
  },
}))
