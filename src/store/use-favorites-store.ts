import { CharactersListItem, PlanetsListItem } from '@/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'

type FavoriteType = 'characters' | 'planets'

type FavoritesStore = {
  favorites: {
    characters: CharactersListItem[]
    planets: PlanetsListItem[]
  }
  addCharacterFavorite: (character: CharactersListItem) => void
  addPlanetFavorite: (planet: PlanetsListItem) => void
  removeFavorite: (type: FavoriteType, url: string) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  devtools(
    persist(
      (set) => ({
        favorites: {
          characters: [],
          planets: [],
        },
        addCharacterFavorite: (character) =>
          set(
            produce((state: FavoritesStore) => {
              state.favorites.characters.push(character)
            }),
          ),
        addPlanetFavorite: (planet) =>
          set(
            produce((state: FavoritesStore) => {
              state.favorites.planets.push(planet)
            }),
          ),
        removeFavorite: (type, url) => {
          set(
            produce((state: FavoritesStore) => {
              if (type === 'characters') {
                state.favorites.characters = state.favorites.characters.filter(
                  (character) => character.url !== url,
                )
              } else if (type === 'planets') {
                state.favorites.planets = state.favorites.planets.filter(
                  (planet) => planet.url !== url,
                )
              }
            }),
          )
        },
      }),
      {
        name: 'favorites-storage',
      },
    ),
    { name: 'favorites-store' },
  ),
)
