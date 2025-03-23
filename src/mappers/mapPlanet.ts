import { Person as PersonAPI, Planet as PlanetAPI, Film as FilmAPI } from '@/entities'
import { Planet as PlanetUI } from '@/models'

type MapPlanetProps = {
  planet: PlanetAPI
  externalInfos: {
    residents: PersonAPI[]
    films: FilmAPI[]
  }
}

/**
 * Maps the API data for a planet and its external information to the application's planet model.
 *
 * This function performs the following steps:
 * 1. Maps each planet's information, including name, rotation period, orbital period, diameter, climate, gravity, terrain, surface water, population, and URL.
 * 2. Maps the residents' information.
 * 3. Maps the titles of films associated with the planet.
 *
 * @param {MapPlanetProps} props - The properties containing the API data for the planet and its external information.
 * @param {PlanetAPI} props.planet - The API data for the planet.
 * @param {PersonAPI[]} props.externalInfos.residents - The API data for the residents of the planet.
 * @param {FilmAPI[]} props.externalInfos.films - The API data for the films associated with the planet.
 * @returns {PlanetUI} The mapped planet data.
 */
export function mapPlanet({ planet, externalInfos }: MapPlanetProps): PlanetUI {
  return {
    name: planet.name || 'Unknown',
    rotationPeriod: planet.rotation_period || 'Unknown',
    orbitalPeriod: planet.orbital_period || 'Unknown',
    diameter: planet.diameter || 'Unknown',
    climate: planet.climate || 'Unknown',
    gravity: planet.gravity || 'Unknown',
    terrain: planet.terrain || 'Unknown',
    surfaceWater: planet.surface_water || 'Unknown',
    population: planet.population || 'Unknown',
    residents: externalInfos.residents.map((resident) => ({
      name: resident.name,
      url: resident.url,
    })),
    films: externalInfos.films.map((film) => film.title),
    url: planet.url,
  }
}
