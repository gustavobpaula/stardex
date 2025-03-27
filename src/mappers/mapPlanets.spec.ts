import { planetAPI, planetAPI_2 } from '@/__mocks__/planetAPI'
import { mapPlanets } from './mapPlanets'
import { Planets as PlanetsAPI, Person as PersonAPI } from '@/entities'
import { Planets as PlanetsUI } from '@/models'
import { extractPageFromUrl } from '@/utils'

jest.mock('@/utils', () => ({
  extractPageFromUrl: jest.fn(),
}))

describe('mapPlanets', () => {
  const mockPlanetsAPI: PlanetsAPI = {
    count: 2,
    next: 'https://swapi.dev/api/planets/?page=2',
    previous: null,
    results: [planetAPI, planetAPI_2],
  }

  const mockExternalInfos = [
    {
      residents: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        { name: 'C-3PO', url: 'https://swapi.dev/api/people/2/' },
      ] as PersonAPI[],
    },
    {
      residents: [{ name: 'Leia Organa', url: 'https://swapi.dev/api/people/5/' }] as PersonAPI[],
    },
  ]

  it('should map API data to the application planet model', () => {
    ;(extractPageFromUrl as jest.Mock).mockImplementation((url: string) => {
      const params = new URL(url).searchParams
      return params.get('page') ? parseInt(params.get('page')!, 10) : null
    })

    const result: PlanetsUI = mapPlanets({
      planets: mockPlanetsAPI,
      externalInfos: mockExternalInfos,
    })

    expect(result).toEqual({
      total: 2,
      nextPage: 2,
      previousPage: null,
      planets: [
        {
          name: 'Tatooine',
          orbitalPeriod: '304',
          rotationPeriod: '23',
          climate: 'arid',
          residents: [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'C-3PO', url: 'https://swapi.dev/api/people/2/' },
          ],
          url: 'https://swapi.dev/api/planets/1/',
        },
        {
          name: 'Alderaan',
          orbitalPeriod: '364',
          rotationPeriod: '24',
          climate: 'temperate',
          residents: [{ name: 'Leia Organa', url: 'https://swapi.dev/api/people/5/' }],
          url: 'https://swapi.dev/api/planets/2/',
        },
      ],
    })
  })

  it('should handle missing or undefined fields gracefully', () => {
    const incompletePlanetsAPI = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: undefined,
          orbital_period: undefined,
          rotation_period: undefined,
          climate: undefined,
          url: undefined,
        },
      ],
    } as unknown as PlanetsAPI

    const incompleteExternalInfos = [
      {
        residents: [],
      },
    ]

    const result: PlanetsUI = mapPlanets({
      planets: incompletePlanetsAPI,
      externalInfos: incompleteExternalInfos,
    })

    expect(result).toEqual({
      total: 1,
      nextPage: null,
      previousPage: null,
      planets: [
        {
          name: 'Unknown',
          orbitalPeriod: 'Unknown',
          rotationPeriod: 'Unknown',
          climate: 'Unknown',
          residents: [],
          url: '',
        },
      ],
    })
  })

  it('should return an empty planets array if no results are provided', () => {
    const emptyPlanetsAPI: PlanetsAPI = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }

    const result: PlanetsUI = mapPlanets({
      planets: emptyPlanetsAPI,
      externalInfos: [],
    })

    expect(result).toEqual({
      total: 0,
      nextPage: null,
      previousPage: null,
      planets: [],
    })
  })
})
