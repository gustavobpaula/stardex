import {
  Person as PersonAPI,
  Planet as PlanetAPI,
  Film as FilmAPI,
  Specie as SpecieAPI,
  Starship as StarshipAPI,
  Vehicles as VehiclesAPI,
} from '@/entities'
import { Character as CharacterUI } from '@/models'
import { request } from './core/request'
import { extractId } from '@/utils'
import { mapCharacter } from '@/mappers'

type DoGetCharacterProps = {
  url: string
}

/**
 * Fetches a character from the Star Wars API and maps it to the application's character model.
 *
 * This function performs the following steps:
 * 1. Extracts the character ID from the provided URL.
 * 2. Fetches the character data from the Star Wars API.
 * 3. Fetches the homeworld, films, species, starships, and vehicles information for the character.
 * 4. Maps the fetched data to the application's character model using the `mapCharacter` function.
 *
 * @param {DoGetCharacterProps} props - The properties containing the URL of the character to fetch.
 * @param {string} props.url - The URL of the character to fetch.
 * @returns {Promise<CharacterUI>} A promise that resolves to the mapped character data.
 * @throws {Error} Throws an error if the character URL is invalid or the fetch operation fails.
 */
export async function doGetCharacter({ url }: DoGetCharacterProps): Promise<CharacterUI> {
  const id = extractId(url)

  if (!id) {
    throw new Error('Invalid character URL')
  }

  const res = await request<PersonAPI>({
    url: `https://swapi.dev/api/people/${id}`,
  })

  const [homeworld, films, species, starships, vehicles] = await Promise.all([
    request<PlanetAPI>({ url: res.homeworld }).catch(() => ({}) as PlanetAPI),
    Promise.all(
      res.films.map((film) => request<FilmAPI>({ url: film }).catch(() => ({}) as FilmAPI)),
    ),
    Promise.all(
      res.species.map((specie) =>
        request<SpecieAPI>({ url: specie }).catch(() => ({}) as SpecieAPI),
      ),
    ),
    Promise.all(
      res.starships.map((starship) =>
        request<StarshipAPI>({ url: starship }).catch(() => ({}) as StarshipAPI),
      ),
    ),
    Promise.all(
      res.vehicles.map((vehicle) =>
        request<VehiclesAPI>({ url: vehicle }).catch(() => ({}) as VehiclesAPI),
      ),
    ),
  ])

  const externalInfos = {
    homeworld,
    films,
    species,
    starships,
    vehicles,
  }

  return mapCharacter({ character: res, externalInfos })
}
