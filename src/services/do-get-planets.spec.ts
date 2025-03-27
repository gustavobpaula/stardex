import { doGetPlanets } from './do-get-planets'
import { Planets as PlanetsAPI } from '@/entities'
import { request } from './core/request'
import { planetAPI } from '@/__mocks__/planetAPI'
import { personAPI } from '@/__mocks__/personAPI'

jest.mock('./core/request')

describe('doGetPlanets', () => {
  const mockPlanetsAPI: PlanetsAPI = {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        ...planetAPI,
        residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
        films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/3/'],
      },
    ],
  }

  const mockPersonAPI = personAPI

  beforeEach(() => {
    ;(request as jest.Mock).mockClear()
  })

  it('should fetch planets and map them correctly', async () => {
    ;(request as jest.Mock).mockImplementation(({ url }) => {
      if (url.includes('/planets')) return Promise.resolve(mockPlanetsAPI)
      if (url.includes('/people/1')) return Promise.resolve(mockPersonAPI)
      if (url.includes('/people/2'))
        return Promise.resolve({ ...mockPersonAPI, url: 'https://swapi.dev/api/people/2/' })

      return Promise.reject(new Error('Unknown URL'))
    })

    const result = await doGetPlanets({ page: 1 })

    expect(result).toEqual({
      total: 1,
      nextPage: null,
      previousPage: null,
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
              url: 'https://swapi.dev/api/people/2/',
            },
          ],
          url: 'https://swapi.dev/api/planets/1/',
        },
      ],
    })
  })

  it('should handle search parameter correctly', async () => {
    ;(request as jest.Mock).mockImplementation(({ url }) => {
      if (url.includes('/planets')) return Promise.resolve(mockPlanetsAPI)
      if (url.includes('/people/1')) return Promise.resolve(mockPersonAPI)
      if (url.includes('/people/2'))
        return Promise.resolve({ ...mockPersonAPI, url: 'https://swapi.dev/api/people/2/' })

      return Promise.reject(new Error('Unknown URL'))
    })

    const result = await doGetPlanets({ page: 1, search: 'Tatooine' })

    expect(request).toHaveBeenCalledWith({
      url: 'https://swapi.dev/api/planets',
      query: { page: 1, search: 'Tatooine' },
    })

    expect(result).toEqual({
      total: 1,
      nextPage: null,
      previousPage: null,
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
              url: 'https://swapi.dev/api/people/2/',
            },
          ],
          url: 'https://swapi.dev/api/planets/1/',
        },
      ],
    })
  })

  it('should handle errors gracefully', async () => {
    ;(request as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))

    await expect(doGetPlanets({ page: 1 })).rejects.toThrow('Failed to fetch')
  })
})
