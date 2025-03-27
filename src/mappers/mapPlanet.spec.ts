import { planetAPI } from '@/__mocks__/planetAPI'
import { mapPlanet } from './mapPlanet'
import { Planet as PlanetAPI, Film as FilmAPI } from '@/entities'
import { Planet as PlanetUI } from '@/models'
import { personAPI, personAPI_2 } from '@/__mocks__/personAPI'

describe('mapPlanet', () => {
  const mockPlanet = planetAPI

  const mockExternalInfos = {
    residents: [personAPI, personAPI_2],
    films: [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }] as FilmAPI[],
  }

  it('should map API data to the application planet model', () => {
    const result: PlanetUI = mapPlanet({
      planet: mockPlanet,
      externalInfos: mockExternalInfos,
    })

    expect(result).toEqual({
      name: 'Tatooine',
      rotationPeriod: '23',
      orbitalPeriod: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surfaceWater: '1',
      population: '200000',
      residents: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
        { name: 'C-3PO', url: 'https://swapi.dev/api/people/2/' },
      ],
      films: ['A New Hope', 'The Empire Strikes Back'],
      url: 'https://swapi.dev/api/planets/1/',
    })
  })

  it('should handle missing or undefined fields gracefully', () => {
    const incompletePlanet = {
      name: undefined,
      rotation_period: undefined,
      orbital_period: undefined,
      diameter: undefined,
      climate: undefined,
      gravity: undefined,
      terrain: undefined,
      surface_water: undefined,
      population: undefined,
      url: undefined,
    } as unknown as PlanetAPI

    const incompleteExternalInfos = {
      residents: [],
      films: [],
    }

    const result: PlanetUI = mapPlanet({
      planet: incompletePlanet,
      externalInfos: incompleteExternalInfos,
    })

    expect(result).toEqual({
      name: 'Unknown',
      rotationPeriod: 'Unknown',
      orbitalPeriod: 'Unknown',
      diameter: 'Unknown',
      climate: 'Unknown',
      gravity: 'Unknown',
      terrain: 'Unknown',
      surfaceWater: 'Unknown',
      population: 'Unknown',
      residents: [],
      films: [],
      url: undefined,
    })
  })

  it('should return an empty residents and films array if no external information is provided', () => {
    const result: PlanetUI = mapPlanet({
      planet: mockPlanet,
      externalInfos: {
        residents: [],
        films: [],
      },
    })

    expect(result.residents).toEqual([])
    expect(result.films).toEqual([])
  })
})
