import { Planets as PlanetsAPI, Film as FilmAPI, Person as PersonAPI } from '@/entities'
import { Planets as PlanetsUI } from '@/models'
import { request } from './core/request'
import { mapPlanets } from '@/mappers'

type DoGetPlanets = {
  page?: number
}

/**
 * Fetches planets from the Star Wars API and maps them to the application's planet model.
 *
 * This function performs the following steps:
 * 1. Fetches a list of planets from the Star Wars API.
 * 2. Fetches the film information for each planet in the list.
 * 3. Fetches the resident information for each planet in the list.
 * 4. Maps the fetched data to the application's planet model using the `mapPlanets` function.
 *
 * @param {DoGetPlanets} [params={ page: 1 }] - The parameters for fetching planets, including the page number.
 * @returns {Promise<PlanetsUI>} A promise that resolves to the mapped planet data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function doGetPlanets(params: DoGetPlanets = { page: 1 }): Promise<PlanetsUI> {
  const { page } = params
  const res = await request<PlanetsAPI>({
    url: `https://swapi.dev/api/planets?page=${page}`,
  })

  const externalInfosPromise = res.results.map(async (planet) => {
    const films = await Promise.all(
      planet.films.map((film) => request<FilmAPI>({ url: film }).catch(() => ({}) as FilmAPI)),
    )

    const residents = await Promise.all(
      planet.residents.map((resident) =>
        request<PersonAPI>({ url: resident }).catch(() => ({}) as PersonAPI),
      ),
    )

    return { films, residents }
  })

  const externalInfos = await Promise.all(externalInfosPromise)

  return mapPlanets({ planets: res, externalInfos })
}
