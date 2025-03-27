import { act } from '@testing-library/react'
import { usePlanetStore } from './use-planet-store'
import { doGetPlanet } from '@/services'

jest.mock('@/services', () => ({
  doGetPlanet: jest.fn(),
}))

describe('usePlanetStore', () => {
  const mockPlanet = {
    name: 'Tatooine',
    rotationPeriod: '23',
    orbitalPeriod: '304',
    diameter: '10465',
    climate: 'Arid',
    gravity: '1 standard',
    terrain: 'Desert',
    surfaceWater: '1',
    population: '200000',
    residents: [
      { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      { name: 'C-3PO', url: 'https://swapi.dev/api/people/2/' },
    ],
    films: ['A New Hope', 'The Empire Strikes Back'],
    url: 'https://swapi.dev/api/planets/1/',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    act(() => {
      usePlanetStore.setState({
        isLoading: false,
        planet: {
          name: '',
          rotationPeriod: '',
          orbitalPeriod: '',
          diameter: '',
          climate: '',
          gravity: '',
          terrain: '',
          surfaceWater: '',
          population: '',
          residents: [],
          films: [],
          url: '',
        },
      })
    })
  })

  it('should have the correct initial state', () => {
    const { isLoading, planet } = usePlanetStore.getState()

    expect(isLoading).toBe(false)
    expect(planet).toEqual({
      name: '',
      rotationPeriod: '',
      orbitalPeriod: '',
      diameter: '',
      climate: '',
      gravity: '',
      terrain: '',
      surfaceWater: '',
      population: '',
      residents: [],
      films: [],
      url: '',
    })
  })

  it('should set isLoading to true when loadPlanet is called', async () => {
    ;(doGetPlanet as jest.Mock).mockResolvedValue(mockPlanet)

    const { loadPlanet } = usePlanetStore.getState()

    act(() => {
      loadPlanet({ id: 1 })
    })

    const { isLoading } = usePlanetStore.getState()
    expect(isLoading).toBe(true)
  })

  it('should load a planet and update the state', async () => {
    ;(doGetPlanet as jest.Mock).mockResolvedValue(mockPlanet)

    const { loadPlanet } = usePlanetStore.getState()

    await act(async () => {
      await loadPlanet({ id: 1 })
    })

    const { isLoading, planet } = usePlanetStore.getState()

    expect(isLoading).toBe(false)
    expect(planet).toEqual(mockPlanet)
  })

  it('should set isLoading to false if loadPlanet fails', async () => {
    ;(doGetPlanet as jest.Mock).mockRejectedValue(new Error('Failed to fetch planet'))

    const { loadPlanet } = usePlanetStore.getState()

    await act(async () => {
      await loadPlanet({ id: 1 })
    })

    const { isLoading } = usePlanetStore.getState()

    expect(isLoading).toBe(false)
  })
})
