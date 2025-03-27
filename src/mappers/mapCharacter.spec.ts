import { personAPI } from '@/__mocks__/personAPI'
import { mapCharacter } from './mapCharacter'
import {
  Person as PersonAPI,
  Planet as PlanetAPI,
  Film as FilmAPI,
  Specie as SpecieAPI,
  Starship as StarshipAPI,
  Vehicles as VehiclesAPI,
} from '@/entities'
import { Character as CharacterUI } from '@/models'

describe('mapCharacter', () => {
  const mockCharacter: PersonAPI = personAPI

  const mockExternalInfos = {
    homeworld: {
      name: 'Tatooine',
      url: 'https://swapi.dev/api/planets/1/',
    } as PlanetAPI,
    films: [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }] as FilmAPI[],
    species: [{ name: 'Human' }] as SpecieAPI[],
    starships: [{ name: 'X-wing' }, { name: 'Imperial shuttle' }] as StarshipAPI[],
    vehicles: [{ name: 'Snowspeeder' }, { name: 'Imperial Speeder Bike' }] as VehiclesAPI[],
  }

  it('should map API data to the application character model', () => {
    const result: CharacterUI = mapCharacter({
      character: mockCharacter,
      externalInfos: mockExternalInfos,
    })

    expect(result).toEqual({
      name: 'Luke Skywalker',
      birthYear: '19BBY',
      eyeColor: 'Blue',
      gender: 'Male',
      hairColor: 'Blond',
      height: '172',
      mass: '77',
      skinColor: 'Fair',
      homeworld: {
        name: 'Tatooine',
        url: 'https://swapi.dev/api/planets/1/',
      },
      films: ['A New Hope', 'The Empire Strikes Back'],
      species: ['Human'],
      starships: ['X-wing', 'Imperial shuttle'],
      vehicles: ['Snowspeeder', 'Imperial Speeder Bike'],
      url: 'https://swapi.dev/api/people/1/',
    })
  })

  it('should handle missing or undefined fields gracefully', () => {
    const incompleteCharacter = {
      name: undefined,
      birth_year: undefined,
      eye_color: undefined,
      gender: undefined,
      hair_color: undefined,
      height: undefined,
      mass: undefined,
      skin_color: undefined,
      url: undefined,
    } as unknown as PersonAPI

    const incompleteExternalInfos = {
      homeworld: { name: undefined, url: undefined } as unknown as PlanetAPI,
      films: [] as FilmAPI[],
      species: [] as SpecieAPI[],
      starships: [] as StarshipAPI[],
      vehicles: [] as VehiclesAPI[],
    }

    const result: CharacterUI = mapCharacter({
      character: incompleteCharacter,
      externalInfos: incompleteExternalInfos,
    })

    expect(result).toEqual({
      name: 'Unknown',
      birthYear: 'Unknown',
      eyeColor: 'Unknown',
      gender: 'Unknown',
      hairColor: 'Unknown',
      height: 'Unknown',
      mass: 'Unknown',
      skinColor: 'Unknown',
      homeworld: {
        name: 'Unknown',
        url: '',
      },
      films: [],
      species: [],
      starships: [],
      vehicles: [],
      url: '',
    })
  })
})
