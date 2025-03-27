import { act } from '@testing-library/react'
import { useCharacterStore } from './use-character-store'
import { doGetCharacter } from '@/services'

jest.mock('@/services', () => ({
  doGetCharacter: jest.fn(),
}))

describe('useCharacterStore', () => {
  const mockCharacter = {
    birthYear: '19BBY',
    eyeColor: 'Blue',
    films: ['A New Hope', 'The Empire Strikes Back'],
    gender: 'Male',
    hairColor: 'Blond',
    height: '172',
    homeworld: {
      name: 'Tatooine',
      url: 'https://swapi.dev/api/planets/1/',
    },
    mass: '77',
    name: 'Luke Skywalker',
    skinColor: 'Fair',
    species: ['Human'],
    starships: ['X-wing'],
    vehicles: ['Speeder Bike'],
    url: 'https://swapi.dev/api/people/1/',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should have the correct initial state', () => {
    const { isLoading, character } = useCharacterStore.getState()

    expect(isLoading).toBe(false)
    expect(character).toEqual({
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
    })
  })

  it('should set isLoading to true when loadCharacter is called', async () => {
    ;(doGetCharacter as jest.Mock).mockResolvedValue(mockCharacter)

    const { loadCharacter } = useCharacterStore.getState()

    act(() => {
      loadCharacter({ id: 1 })
    })

    const { isLoading } = useCharacterStore.getState()
    expect(isLoading).toBe(true)
  })

  it('should load a character and update the state', async () => {
    ;(doGetCharacter as jest.Mock).mockResolvedValue(mockCharacter)

    const { loadCharacter } = useCharacterStore.getState()

    await act(async () => {
      await loadCharacter({ id: 1 })
    })

    const { isLoading, character } = useCharacterStore.getState()

    expect(isLoading).toBe(false)
    expect(character).toEqual(mockCharacter)
  })

  it('should set isLoading to false if loadCharacter fails', async () => {
    ;(doGetCharacter as jest.Mock).mockRejectedValue(new Error('Failed to fetch character'))

    const { loadCharacter } = useCharacterStore.getState()

    await act(async () => {
      await loadCharacter({ id: 1 })
    })

    const { isLoading } = useCharacterStore.getState()

    expect(isLoading).toBe(false)
  })
})
