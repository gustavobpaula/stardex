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

export interface Characters {
  nextPage: string
  previousPage: string
  characters: Array<Pick<Character, 'name' | 'height' | 'birthYear' | 'homeworld'>>
}
