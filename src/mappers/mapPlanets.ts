import { Planets as PlanetsAPI, Person as PersonAPI } from '@/entities'
import { Planets as PlanetsUI } from '@/models'
import { extractPageFromUrl } from '@/utils'

type MapPlanetsProps = {
  planets: PlanetsAPI
  externalInfos: Array<{
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
 * @param {Array<{ residents: PersonAPI[] }>} props.externalInfos - The external information for each planet, including residents.
 * @returns {PlanetsUI} The mapped planet data.
 */
export function mapPlanets({ planets, externalInfos }: MapPlanetsProps): PlanetsUI {
  return {
    total: planets.count || 0,
    nextPage: planets.next ? extractPageFromUrl(planets.next) : null,
    previousPage: planets.previous ? extractPageFromUrl(planets.previous) : null,
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
        url: planet.url || '',
      }
    }),
  }
}
