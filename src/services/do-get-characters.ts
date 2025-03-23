import { People as PeopleAPI, Planet as PlanetAPI } from '@/entities'
import { Characters as CharactersUI } from '@/models'
import { request } from './core/request'
import { mapCharacters } from '@/mappers'

type DoGetCharactersProps = {
  page?: number
  search?: string
}

/**
 * Fetches characters from the Star Wars API and maps them to the application's character model.
 *
 * This function performs the following steps:
 * 1. Fetches a list of people from the Star Wars API with optional pagination and search parameters.
 * 2. Fetches the homeworld information for each person in the list.
 * 3. Maps the fetched data to the application's character model using the `mapCharacters` function.
 *
 * @param {DoGetCharactersProps} [params] - The parameters for fetching characters, including the page number and search query.
 * @returns {Promise<CharactersUI>} A promise that resolves to the mapped character data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function doGetCharacters(params: DoGetCharactersProps): Promise<CharactersUI> {
  const res = await request<PeopleAPI>({
    url: `https://swapi.dev/api/people`,
    query: params,
  })

  const planets = await Promise.all(
    res.results.map((person) =>
      request<PlanetAPI>({ url: person.homeworld }).catch(() => ({}) as PlanetAPI),
    ),
  )

  return mapCharacters(res, planets)
}
