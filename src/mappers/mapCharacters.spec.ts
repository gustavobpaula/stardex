import { personAPI, personAPI_2 } from '@/__mocks__/personAPI'
import { mapCharacters } from './mapCharacters'
import { People as PeopleAPI, Planet as PlanetAPI, Person as PersonAPI } from '@/entities'
import { Characters as CharactersUI } from '@/models'
import { extractPageFromUrl } from '@/utils'
import { planetAPI, planetAPI_2 } from '@/__mocks__/planetAPI'

jest.mock('@/utils', () => ({
  extractPageFromUrl: jest.fn(),
}))

describe('mapCharacters', () => {
  const mockPeopleAPI: PeopleAPI = {
    count: 2,
    next: 'https://swapi.dev/api/people/?page=2',
    previous: null,
    results: [personAPI, personAPI_2],
  }

  const mockPlanetsAPI: PlanetAPI[] = [planetAPI, planetAPI_2]

  it('should map API data to the application character model', () => {
    ;(extractPageFromUrl as jest.Mock).mockImplementation((url: string) => {
      const params = new URL(url).searchParams
      return params.get('page') ? parseInt(params.get('page')!, 10) : null
    })

    const result: CharactersUI = mapCharacters(mockPeopleAPI, mockPlanetsAPI)

    expect(result).toEqual({
      total: 2,
      nextPage: 2,
      previousPage: null,
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
        {
          name: 'C-3PO',
          birthYear: '112BBY',
          height: '167',
          homeworld: {
            name: 'Alderaan',
            url: 'https://swapi.dev/api/planets/2/',
          },
          url: 'https://swapi.dev/api/people/2/',
        },
      ],
    })
  })

  it('should handle missing or undefined fields gracefully', () => {
    const incompletePeopleAPI: PeopleAPI = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: undefined,
          birth_year: undefined,
          height: undefined,
          homeworld: undefined,
          url: undefined,
        } as unknown as PersonAPI,
      ],
    }

    const incompletePlanetsAPI: PlanetAPI[] = [
      { name: undefined, url: undefined } as unknown as PlanetAPI,
    ]

    const result: CharactersUI = mapCharacters(incompletePeopleAPI, incompletePlanetsAPI)

    expect(result).toEqual({
      total: 1,
      nextPage: null,
      previousPage: null,
      characters: [
        {
          name: 'Unknown',
          birthYear: 'Unknown',
          height: 'Unknown',
          homeworld: {
            name: 'Unknown',
            url: '',
          },
          url: '',
        },
      ],
    })
  })

  it('should return an empty characters array if no results are provided', () => {
    const emptyPeopleAPI: PeopleAPI = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    }

    const result: CharactersUI = mapCharacters(emptyPeopleAPI, [])

    expect(result).toEqual({
      total: 0,
      nextPage: null,
      previousPage: null,
      characters: [],
    })
  })
})
