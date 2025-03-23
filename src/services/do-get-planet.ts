import { Planet as PlanetAPI, Person as PersonAPI, Film as FilmAPI } from '@/entities'
import { Planet as PlanetUI } from '@/models'
import { request } from './core/request'
import { extractId } from '@/utils'
import { mapPlanet } from '@/mappers'

type DoGetPlanetProps = {
  url: string
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
export async function doGetPlanet({ url }: DoGetPlanetProps): Promise<PlanetUI> {
  const id = extractId(url)

  if (!id) {
    throw new Error('Invalid planet URL')
  }

  const res = await request<PlanetAPI>({
    url: `https://swapi.dev/api/planets/${id}`,
  })

  const [residents, films] = await Promise.all([
    Promise.all(
      res.residents.map((resident) =>
        request<PersonAPI>({ url: resident }).catch(() => ({}) as PersonAPI),
      ),
    ),
    Promise.all(
      res.films.map((film) => request<FilmAPI>({ url: film }).catch(() => ({}) as FilmAPI)),
    ),
  ])

  const externalInfos = {
    residents,
    films,
  }

  return mapPlanet({ planet: res, externalInfos })
}
