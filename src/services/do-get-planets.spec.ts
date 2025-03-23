import { doGetPlanets } from './do-get-planets'
import { Planets as PlanetsAPI, Film as FilmAPI, Person as PersonAPI } from '@/entities'
import { request } from './core/request'

jest.mock('./core/request')

describe('doGetPlanets', () => {
  const mockPlanetsAPI: PlanetsAPI = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
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
        created: '2014-12-09T13:50:49.641000Z',
        edited: '2014-12-20T20:58:18.411000Z',
        url: 'https://swapi.dev/api/planets/1/',
      },
    ],
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

  beforeEach(() => {
    ;(request as jest.Mock).mockClear()
  })

  it('should fetch planets and map them correctly', async () => {
    ;(request as jest.Mock).mockImplementation(({ url }) => {
      if (url.includes('/planets')) return Promise.resolve(mockPlanetsAPI)
      if (url.includes('/films')) return Promise.resolve(mockFilmAPI)
      if (url.includes('/people/1')) return Promise.resolve(mockPersonAPI)
      if (url.includes('/people/2')) return Promise.resolve(mockPersonAPI)

      return Promise.reject(new Error('Unknown URL'))
    })

    const result = await doGetPlanets({ page: 1 })

    expect(result).toEqual({
      qtdItens: 1,
      nextPage: '',
      previousPage: '',
      planets: [
        {
          name: 'Tatooine',
          orbitalPeriod: '304',
          rotationPeriod: '23',
          climate: 'arid',
          residents: [
            {
              name: 'Luke Skywalker',
              url: 'https://swapi.dev/api/people/1/',
            },
            {
              name: 'Luke Skywalker',
              url: 'https://swapi.dev/api/people/1/',
            },
          ],
        },
      ],
    })
  })

  it('should handle search parameter correctly', async () => {
    ;(request as jest.Mock).mockImplementation(({ url }) => {
      if (url.includes('/planets')) return Promise.resolve(mockPlanetsAPI)
      if (url.includes('/films')) return Promise.resolve(mockFilmAPI)
      if (url.includes('/people/1')) return Promise.resolve(mockPersonAPI)
      if (url.includes('/people/2')) return Promise.resolve(mockPersonAPI)

      return Promise.reject(new Error('Unknown URL'))
    })
    const result = await doGetPlanets({ page: 1, search: 'Tatooine' })

    expect(request).toHaveBeenCalledWith({
      url: 'https://swapi.dev/api/planets',
      query: { page: 1, search: 'Tatooine' },
    })

    expect(result).toEqual({
      qtdItens: 1,
      nextPage: '',
      previousPage: '',
      planets: [
        {
          name: 'Tatooine',
          orbitalPeriod: '304',
          rotationPeriod: '23',
          climate: 'arid',
          residents: [
            {
              name: 'Luke Skywalker',
              url: 'https://swapi.dev/api/people/1/',
            },
            {
              name: 'Luke Skywalker',
              url: 'https://swapi.dev/api/people/1/',
            },
          ],
        },
      ],
    })
  })

  it('should handle errors gracefully', async () => {
    ;(request as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    await expect(doGetPlanets({ page: 1 })).rejects.toThrow('Failed to fetch')
  })
})
