import { act } from '@testing-library/react'
import { useCharactersStore } from './use-characters-store'
import { doGetCharacters } from '@/services'

jest.mock('@/services', () => ({
  doGetCharacters: jest.fn(),
}))

describe('useCharactersStore', () => {
  const mockCharactersResponse = {
    total: 2,
    characters: [
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Darth Vader',
        url: 'https://swapi.dev/api/people/4/',
      },
    ],
    nextPage: 2,
    previousPage: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should have the correct initial state', () => {
    const { isLoading, total, characters, nextPage, previousPage } = useCharactersStore.getState()

    expect(isLoading).toBe(false)
    expect(total).toBe(0)
    expect(characters).toBeUndefined()
    expect(nextPage).toBeNull()
    expect(previousPage).toBeNull()
  })

  it('should set isLoading to true when loadCharacters is called', async () => {
    ;(doGetCharacters as jest.Mock).mockResolvedValue(mockCharactersResponse)

    const { loadCharacters } = useCharactersStore.getState()

    act(() => {
      loadCharacters()
    })

    const { isLoading } = useCharactersStore.getState()
    expect(isLoading).toBe(true)
  })

  it('should load characters and update the state', async () => {
    ;(doGetCharacters as jest.Mock).mockResolvedValue(mockCharactersResponse)

    const { loadCharacters } = useCharactersStore.getState()

    await act(async () => {
      await loadCharacters()
    })

    const { isLoading, total, characters, nextPage, previousPage } = useCharactersStore.getState()

    expect(isLoading).toBe(false)
    expect(total).toBe(2)
    expect(characters).toEqual(mockCharactersResponse.characters)
    expect(nextPage).toBe(2)
    expect(previousPage).toBeNull()
  })

  it('should set isLoading to false if loadCharacters fails', async () => {
    ;(doGetCharacters as jest.Mock).mockRejectedValue(new Error('Failed to fetch characters'))

    const { loadCharacters } = useCharactersStore.getState()

    await act(async () => {
      await loadCharacters()
    })

    const { isLoading } = useCharactersStore.getState()

    expect(isLoading).toBe(false)
  })
})
