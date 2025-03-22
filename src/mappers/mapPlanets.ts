import { Planets as PlanetsAPI, Film as FilmAPI, Person as PersonAPI } from '@/entities'
import { Planets as PlanetsUI } from '@/models'

type MapPlanetsProps = {
  planets: PlanetsAPI
  externalInfos: Array<{
    films: FilmAPI[]
    residents: PersonAPI[]
  }>
}

/**
 * Maps the API data for planets and their external information to the application's planet model.
 *
 * This function performs the following steps:
 * 1. Maps the pagination information (next and previous pages).
 * 2. Maps each planet's information, including name, orbital period, rotation period, climate, and residents.
 *
 * @param {MapPlanetsProps} props - The properties containing the API data for planets and their external information.
 * @param {PlanetsAPI} props.planets - The API data for planets.
 * @param {Array<{ films: FilmAPI[], residents: PersonAPI[] }>} props.externalInfos - The external information for each planet, including films and residents.
 * @returns {PlanetsUI} The mapped planet data.
 */
export function mapPlanets({ planets, externalInfos }: MapPlanetsProps): PlanetsUI {
  return {
    qtdItens: planets.count,
    nextPage: planets.next || '',
    previousPage: planets.previous || '',
    planets: planets.results.map((planet, index) => {
      const residents =
        externalInfos[index]?.residents.map((resident) => ({
          name: resident.name,
          url: resident.url,
        })) || []

      return {
        name: planet.name || 'Unknown',
        orbitalPeriod: planet.orbital_period || 'Unknown',
        rotationPeriod: planet.rotation_period || 'Unknown',
        climate: planet.climate || 'Unknown',
        residents: residents,
      }
    }),
  }
}
