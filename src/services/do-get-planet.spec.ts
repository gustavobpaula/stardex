import { doGetPlanet } from './do-get-planet'
import { request } from './core/request'
import { extractId } from '@/utils'
import { mapPlanet } from '@/mappers'
import { Planet as PlanetAPI, Person as PersonAPI, Film as FilmAPI } from '@/entities'

jest.mock('./core/request')
jest.mock('@/utils', () => ({
  extractId: jest.fn(),
}))
jest.mock('@/mappers', () => ({
  mapPlanet: jest.fn(),
}))

describe('doGetPlanet', () => {
  const mockPlanetAPI: PlanetAPI = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
    films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/3/'],
    url: 'https://swapi.dev/api/planets/1/',
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
  }

  const mockPersonAPI: PersonAPI = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: ['https://swapi.dev/api/films/1/'],
    species: [],
    vehicles: ['https://swapi.dev/api/vehicles/14/'],
    starships: ['https://swapi.dev/api/starships/12/'],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  }

  const mockFilmAPI: FilmAPI = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: ['https://swapi.dev/api/people/1/'],
    planets: ['https://swapi.dev/api/planets/1/'],
    starships: ['https://swapi.dev/api/starships/2/'],
    vehicles: ['https://swapi.dev/api/vehicles/4/'],
    species: ['https://swapi.dev/api/species/1/'],
    created: '2014-12-10T14:23:31.880000Z',
    edited: '2014-12-20T19:49:45.256000Z',
    url: 'https://swapi.dev/api/films/1/',
  }

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
