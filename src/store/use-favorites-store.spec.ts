import { act } from '@testing-library/react'
import { useFavoritesStore } from './use-favorites-store'
import { CharactersListItem, PlanetsListItem } from '@/models'

describe('useFavoritesStore', () => {
  const mockCharacter: CharactersListItem = {
    name: 'Luke Skywalker',
    height: '172',
    url: 'https://swapi.dev/api/people/1/',
    birthYear: '19BBY',
    homeworld: {
      name: 'Tatooine',
      url: 'https://swapi.dev/api/planets/1/',
    },
  }

  const mockPlanet: PlanetsListItem = {
    name: 'Tatooine',
    orbitalPeriod: '304',
    rotationPeriod: '23',
    climate: 'arid',
    residents: [
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
      },
    ],
    url: 'https://swapi.dev/api/planets/1/',
  }

  beforeEach(() => {
    // Reset the store state before each test
    act(() => {
      useFavoritesStore.setState({
        favorites: {
          characters: [],
          planets: [],
        },
      })
    })
  })

  it('should have the correct initial state', () => {
    const { favorites } = useFavoritesStore.getState()

    expect(favorites.characters).toEqual([])
    expect(favorites.planets).toEqual([])
  })

  it('should add a character to favorites', () => {
    const { addCharacterFavorite } = useFavoritesStore.getState()

    act(() => {
      addCharacterFavorite(mockCharacter)
    })

    const { favorites } = useFavoritesStore.getState()

    expect(favorites.characters).toHaveLength(1)
    expect(favorites.characters[0]).toEqual(mockCharacter)
  })

  it('should add a planet to favorites', () => {
    const { addPlanetFavorite } = useFavoritesStore.getState()

    act(() => {
      addPlanetFavorite(mockPlanet)
    })

    const { favorites } = useFavoritesStore.getState()

    expect(favorites.planets).toHaveLength(1)
    expect(favorites.planets[0]).toEqual(mockPlanet)
  })

  it('should remove a character from favorites', () => {
    const { addCharacterFavorite, removeFavorite } = useFavoritesStore.getState()

    act(() => {
      addCharacterFavorite(mockCharacter)
    })

    let favorites = useFavoritesStore.getState().favorites

    expect(favorites.characters).toHaveLength(1)

    act(() => {
      removeFavorite('characters', mockCharacter.url)
    })

    favorites = useFavoritesStore.getState().favorites

    expect(favorites.characters).toHaveLength(0)
  })

  it('should remove a planet from favorites', () => {
    const { addPlanetFavorite, removeFavorite } = useFavoritesStore.getState()

    act(() => {
      addPlanetFavorite(mockPlanet)
    })

    let favorites = useFavoritesStore.getState().favorites

    expect(favorites.planets).toHaveLength(1)

    act(() => {
      removeFavorite('planets', mockPlanet.url)
    })

    favorites = useFavoritesStore.getState().favorites

    expect(favorites.planets).toHaveLength(0)
  })

  it('should not remove a character if the URL does not match', () => {
    const { addCharacterFavorite, removeFavorite } = useFavoritesStore.getState()

    act(() => {
      addCharacterFavorite(mockCharacter)
    })

    let favorites = useFavoritesStore.getState().favorites

    expect(favorites.characters).toHaveLength(1)

    act(() => {
      removeFavorite('characters', 'https://swapi.dev/api/people/999/')
    })

    favorites = useFavoritesStore.getState().favorites

    expect(favorites.characters).toHaveLength(1)
  })

  it('should not remove a planet if the URL does not match', () => {
    const { addPlanetFavorite, removeFavorite } = useFavoritesStore.getState()

    act(() => {
      addPlanetFavorite(mockPlanet)
    })

    let favorites = useFavoritesStore.getState().favorites

    expect(favorites.planets).toHaveLength(1)

    act(() => {
      removeFavorite('planets', 'https://swapi.dev/api/planets/999/')
    })

    favorites = useFavoritesStore.getState().favorites

    expect(favorites.planets).toHaveLength(1)
  })
})
