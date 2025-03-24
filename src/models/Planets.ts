export interface Planet {
  name: string
  rotationPeriod: string
  orbitalPeriod: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surfaceWater: string
  population: string
  residents: Array<{ name: string; url: string }>
  films: Array<string>
  url: string
}

export interface Planets {
  total: number
  nextPage: string
  previousPage: string
  planets: Array<
    Pick<Planet, 'name' | 'orbitalPeriod' | 'rotationPeriod' | 'climate' | 'residents'>
  >
}
