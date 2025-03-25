import { Character } from '@/models'
import { doGetCharacter } from '@/services'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type CharactersStore = {
  isLoading: boolean
  character: Character
  loadCharacter: ({ url }: { url: string }) => Promise<void>
}

export const useCharacterStore = create<CharactersStore>()(
  devtools(
    (set) => ({
      isLoading: false,
      character: {
        birthYear: '',
        eyeColor: '',
        films: [],
        gender: '',
        hairColor: '',
        height: '',
        homeworld: {
          name: '',
          url: '',
        },
        mass: '',
        name: '',
        skinColor: '',
        species: [],
        starships: [],
        vehicles: [],
        url: '',
      },
      loadCharacter: ({ url }) => {
        set({ isLoading: true })
        return Promise.resolve()
          .then(() => doGetCharacter({ url }))
          .then((character) => set({ character }))
          .finally(() => set({ isLoading: false }))
      },
    }),
    { name: 'character-store' },
  ),
)
