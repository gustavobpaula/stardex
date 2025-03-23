import { Planets as PlanetsAPI, Person as PersonAPI } from '@/entities'
import { Planets as PlanetsUI } from '@/models'
import { request } from './core/request'
import { mapPlanets } from '@/mappers'

type DoGetPlanetsProps = {
  page?: number
  search?: string
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
 * @param {DoGetPlanetsProps} [params={ page: 1 }] - The parameters for fetching planets, including the page number and search query.
 * @returns {Promise<PlanetsUI>} A promise that resolves to the mapped planet data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function doGetPlanets(params: DoGetPlanetsProps = { page: 1 }): Promise<PlanetsUI> {
  const res = await request<PlanetsAPI>({
    url: `https://swapi.dev/api/planets`,
    query: params,
  })

  const externalInfosPromise = res.results.map(async (planet) => {
    const residents = await Promise.all(
      planet.residents.map((resident) =>
        request<PersonAPI>({ url: resident }).catch(() => ({}) as PersonAPI),
      ),
    )

    return { residents }
  })

  const externalInfos = await Promise.all(externalInfosPromise)

  return mapPlanets({ planets: res, externalInfos })
}
