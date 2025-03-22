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
  films: Array<{ name: string; url: string }>
  species: Array<{ name: string; url: string }>
  starships: Array<{ name: string; url: string }>
  vehicles: Array<{ name: string; url: string }>
  url: string
  created: string
  edited: string
}

export interface Characters {
  nextPage: string
  previousPage: string
  characters: Array<Pick<Character, 'name' | 'height' | 'birthYear' | 'homeworld'>>
}
