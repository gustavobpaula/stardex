import { Character } from '@/models'
import { doGetCharacter } from '@/services'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type CharactersStore = {
  isLoading: boolean
  character: Character
  loadCharacter: ({ id }: { id: string | number }) => Promise<void>
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
      loadCharacter: ({ id }) => {
        set({ isLoading: true })
        return Promise.resolve()
          .then(() => doGetCharacter({ url: `https://swapi.dev/api/people/${id}` }))
          .then((character) => set({ character }))
          .catch((error) => {
            console.error('Failed to load character:', error)
          })
          .finally(() => set({ isLoading: false }))
      },
    }),
    { name: 'character-store' },
  ),
)
