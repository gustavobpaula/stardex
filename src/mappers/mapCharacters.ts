import { People as PeopleAPI, Planet as PlanetAPI } from '@/entities'
import { Characters as CharactersUI } from '@/models'
import { extractPageFromUrl } from '@/utils'

/**
 * Maps the API data for people and planets to the application's character model.
 *
 * This function performs the following steps:
 * 1. Maps the pagination information (next and previous pages).
 * 2. Maps each character's information, including name, birth year, height, and homeworld.
 *
 * @param {PeopleAPI} peopleAPI - The API data for people.
 * @param {PlanetsAPI[]} planetsAPI - The API data for planets.
 * @returns {CharactersUI} The mapped character data.
 */
export function mapCharacters(peopleAPI: PeopleAPI, planetsAPI: PlanetAPI[]): CharactersUI {
  return {
    total: peopleAPI.count || 0,
    nextPage: peopleAPI.next ? extractPageFromUrl(peopleAPI.next) : null,
    previousPage: peopleAPI.previous ? extractPageFromUrl(peopleAPI.previous) : null,
    characters: peopleAPI.results.map((apiCharacter, index) => {
      const homeworld = {
        name: planetsAPI[index]?.name || 'Unknown',
        url: planetsAPI[index]?.url || '',
      }

      return {
        name: apiCharacter.name || 'Unknown',
        birthYear: apiCharacter.birth_year || 'Unknown',
        height: apiCharacter.height || 'Unknown',
        homeworld,
        url: apiCharacter.url || '',
      }
    }),
  }
}
