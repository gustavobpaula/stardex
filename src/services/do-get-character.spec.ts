import { doGetCharacter } from './do-get-character'
import { request } from './core/request'
import { extractId } from '@/utils'
import { mapCharacter } from '@/mappers'
import {
  Person as PersonAPI,
  Planet as PlanetAPI,
  Film as FilmAPI,
  Specie as SpecieAPI,
  Starship as StarshipAPI,
  Vehicles as VehiclesAPI,
} from '@/entities'

jest.mock('./core/request')
jest.mock('@/utils', () => ({
  extractId: jest.fn(),
}))
jest.mock('@/mappers', () => ({
  mapCharacter: jest.fn(),
}))

describe('doGetCharacter', () => {
  const mockPersonAPI: PersonAPI = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    eye_color: 'blue',
    gender: 'male',
    hair_color: 'blond',
    height: '172',
    mass: '77',
    skin_color: 'fair',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: ['https://swapi.dev/api/films/1/'],
    species: ['https://swapi.dev/api/species/1/'],
    starships: ['https://swapi.dev/api/starships/12/'],
    vehicles: ['https://swapi.dev/api/vehicles/14/'],
    url: 'https://swapi.dev/api/people/1/',
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
  }

  const mockPlanetAPI = {
    name: 'Tatooine',
    url: 'https://swapi.dev/api/planets/1/',
  } as PlanetAPI

  const mockFilmAPI = {
    title: 'A New Hope',
    url: 'https://swapi.dev/api/films/1/',
  } as FilmAPI

  const mockSpecieAPI = {
    name: 'Human',
    url: 'https://swapi.dev/api/species/1/',
  } as SpecieAPI

  const mockStarshipAPI = {
    name: 'X-wing',
    url: 'https://swapi.dev/api/starships/12/',
  } as StarshipAPI

  const mockVehicleAPI = {
    name: 'Snowspeeder',
    url: 'https://swapi.dev/api/vehicles/14/',
  } as VehiclesAPI

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch and map character data correctly', async () => {
    ;(extractId as jest.Mock).mockReturnValue('1')
    ;(request as jest.Mock)
      .mockResolvedValueOnce(mockPersonAPI)
      .mockResolvedValueOnce(mockPlanetAPI)
      .mockResolvedValueOnce(mockFilmAPI)
      .mockResolvedValueOnce(mockSpecieAPI)
      .mockResolvedValueOnce(mockStarshipAPI)
      .mockResolvedValueOnce(mockVehicleAPI)

    await doGetCharacter({ url: 'https://swapi.dev/api/people/1/' })

    expect(extractId).toHaveBeenCalledWith('https://swapi.dev/api/people/1/')
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/people/1' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/planets/1/' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/films/1/' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/species/1/' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/starships/12/' })
    expect(request).toHaveBeenCalledWith({ url: 'https://swapi.dev/api/vehicles/14/' })
    expect(mapCharacter).toHaveBeenCalledWith({
      character: mockPersonAPI,
      externalInfos: {
        homeworld: mockPlanetAPI,
        films: [mockFilmAPI],
        species: [mockSpecieAPI],
        starships: [mockStarshipAPI],
        vehicles: [mockVehicleAPI],
      },
    })
  })

  it('should throw an error if the character URL is invalid', async () => {
    ;(extractId as jest.Mock).mockReturnValue('')

    await expect(doGetCharacter({ url: 'invalid-url' })).rejects.toThrow('Invalid character URL')
  })

  it('should handle errors gracefully', async () => {
    ;(extractId as jest.Mock).mockReturnValue('1')
    ;(request as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    await expect(doGetCharacter({ url: 'https://swapi.dev/api/people/1/' })).rejects.toThrow(
      'Failed to fetch',
    )
  })
})
