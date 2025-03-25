export interface Character {
  name: string
  birthYear: string
  eyeColor: string
  gender: string
  hairColor: string
  height: string
  mass: string
  skinColor: string
  homeworld: {
    name: string
    url: string
  }
  films: string[]
  species: string[]
  starships: string[]
  vehicles: string[]
  url: string
}

export type CharactersListItem = Pick<
  Character,
  'name' | 'height' | 'birthYear' | 'homeworld' | 'url'
>

export interface Characters {
  total: number
  nextPage: number | null
  previousPage: number | null
  characters: Array<CharactersListItem>
}
