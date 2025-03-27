import { doGetPlanet } from './do-get-planet'
import { request } from './core/request'
import { extractId } from '@/utils'
import { mapPlanet } from '@/mappers'
import { Planet as PlanetAPI } from '@/entities'
import { planetAPI } from '@/__mocks__/planetAPI'
import { personAPI } from '@/__mocks__/personAPI'
import { filmAPI } from '@/__mocks__/filmAPI'

jest.mock('./core/request')
jest.mock('@/utils', () => ({
  extractId: jest.fn(),
}))
jest.mock('@/mappers', () => ({
  mapPlanet: jest.fn(),
}))

describe('doGetPlanet', () => {
  const mockPlanetAPI: PlanetAPI = {
    ...planetAPI,
    residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
    films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/3/'],
  }

  const mockPersonAPI = personAPI
  const mockFilmAPI = filmAPI

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch and map planet data correctly', async () => {
    ;(extractId as jest.Mock).mockReturnValue('1')
    ;(request as jest.Mock)
      .mockResolvedValueOnce(mockPlanetAPI)
      .mockResolvedValueOnce(mockPersonAPI)
      .mockResolvedValueOnce(mockPersonAPI)
      .mockResolvedValueOnce(mockFilmAPI)
      .mockResolvedValueOnce(mockFilmAPI)

    await doGetPlanet({ url: 'https://swapi.dev/api/planets/1/' })

    expect(extractId).toHaveBeenCalledWith('https://swapi.dev/api/planets/1/')
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/planets/1' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/people/1/' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/people/2/' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/films/1/' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/films/3/' })
    expect(mapPlanet).toHaveBeenCalledWith({
      planet: mockPlanetAPI,
      externalInfos: {
        residents: [mockPersonAPI, mockPersonAPI],
        films: [mockFilmAPI, mockFilmAPI],
      },
    })
  })

  it('should throw an error if the planet URL is invalid', async () => {
    ;(extractId as jest.Mock).mockReturnValue('')

    await expect(doGetPlanet({ url: 'invalid-url' })).rejects.toThrow('Invalid planet URL')
  })

  it('should handle errors gracefully', async () => {
    ;(extractId as jest.Mock).mockReturnValue('1')
    ;(request as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    await expect(doGetPlanet({ url: 'https://swapi.dev/api/planets/1/' })).rejects.toThrow(
      'Failed to fetch',
    )
  })
})
