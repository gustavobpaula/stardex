import { act } from '@testing-library/react'
import { usePlanetsStore } from './use-planets-store'
import { doGetPlanets } from '@/services'

jest.mock('@/services', () => ({
  doGetPlanets: jest.fn(),
}))

describe('usePlanetsStore', () => {
  const mockPlanetsResponse = {
    total: 2,
    planets: [
      {
        name: 'Tatooine',
        url: 'https://swapi.dev/api/planets/1/',
      },
      {
        name: 'Alderaan',
        url: 'https://swapi.dev/api/planets/2/',
      },
    ],
    nextPage: 2,
    previousPage: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    act(() => {
      usePlanetsStore.setState({
        isLoading: false,
        total: 0,
        planets: undefined,
        nextPage: null,
        previousPage: null,
      })
    })
  })

  it('should have the correct initial state', () => {
    const { isLoading, total, planets, nextPage, previousPage } = usePlanetsStore.getState()

    expect(isLoading).toBe(false)
    expect(total).toBe(0)
    expect(planets).toBeUndefined()
    expect(nextPage).toBeNull()
    expect(previousPage).toBeNull()
  })

  it('should set isLoading to true when loadPlanets is called', async () => {
    ;(doGetPlanets as jest.Mock).mockResolvedValue(mockPlanetsResponse)

    const { loadPlanets } = usePlanetsStore.getState()

    act(() => {
      loadPlanets()
    })

    const { isLoading } = usePlanetsStore.getState()
    expect(isLoading).toBe(true)
  })

  it('should load planets and update the state', async () => {
    ;(doGetPlanets as jest.Mock).mockResolvedValue(mockPlanetsResponse)

    const { loadPlanets } = usePlanetsStore.getState()

    await act(async () => {
      await loadPlanets()
    })

    const { isLoading, total, planets, nextPage, previousPage } = usePlanetsStore.getState()

    expect(isLoading).toBe(false)
    expect(total).toBe(2)
    expect(planets).toEqual(mockPlanetsResponse.planets)
    expect(nextPage).toBe(2)
    expect(previousPage).toBeNull()
  })

  it('should set isLoading to false if loadPlanets fails', async () => {
    ;(doGetPlanets as jest.Mock).mockRejectedValue(new Error('Failed to fetch planets'))

    const { loadPlanets } = usePlanetsStore.getState()

    await act(async () => {
      await loadPlanets()
    })

    const { isLoading } = usePlanetsStore.getState()

    expect(isLoading).toBe(false)
  })
})
