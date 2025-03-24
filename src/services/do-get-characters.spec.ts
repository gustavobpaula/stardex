import { doGetCharacters } from './do-get-characters'
import { People as PeopleAPI, Planet as PlanetAPI } from '@/entities'
import { request } from './core/request'

jest.mock('./core/request')

describe('doGetCharacters', () => {
  const mockPeopleAPI: PeopleAPI = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
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
        vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
        starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.dev/api/people/1/',
      },
    ],
  }

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
    films: ['https://swapi.dev/api/films/1/'],
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    url: 'https://swapi.dev/api/planets/1/',
  }

  beforeEach(() => {
    ;(request as jest.Mock).mockClear()
  })

  it('should fetch characters and map them correctly', async () => {
    ;(request as jest.Mock)
      .mockResolvedValueOnce(mockPeopleAPI)
      .mockResolvedValueOnce(mockPlanetAPI)

    const result = await doGetCharacters({ page: 1 })

    expect(result).toEqual({
      nextPage: '',
      previousPage: '',
      characters: [
        {
          name: 'Luke Skywalker',
          birthYear: '19BBY',
          height: '172',
          homeworld: {
            name: 'Tatooine',
            url: 'https://swapi.dev/api/planets/1/',
          },
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    })
  })

  it('should handle search parameter correctly', async () => {
    ;(request as jest.Mock)
      .mockResolvedValueOnce(mockPeopleAPI)
      .mockResolvedValueOnce(mockPlanetAPI)

    const result = await doGetCharacters({ page: 1, search: 'Luke' })

    expect(request).toHaveBeenCalledWith({
      url: 'https://swapi.dev/api/people',
      query: { page: 1, search: 'Luke' },
    })

    expect(result).toEqual({
      nextPage: '',
      previousPage: '',
      characters: [
        {
          name: 'Luke Skywalker',
          birthYear: '19BBY',
          height: '172',
          homeworld: {
            name: 'Tatooine',
            url: 'https://swapi.dev/api/planets/1/',
          },
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    })
  })

  it('should handle errors gracefully', async () => {
    ;(request as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    await expect(doGetCharacters({ page: 1 })).rejects.toThrow('Failed to fetch')
  })
})
