import {
  Person as PersonAPI,
  Planet as PlanetAPI,
  Film as FilmAPI,
  Specie as SpecieAPI,
  Starship as StarshipAPI,
  Vehicles as VehiclesAPI,
} from '@/entities'
import { Character as CharacterUI } from '@/models'

type MapCharacterProps = {
  character: PersonAPI
  externalInfos: {
    homeworld: PlanetAPI
    films: FilmAPI[]
    species: SpecieAPI[]
    starships: StarshipAPI[]
    vehicles: VehiclesAPI[]
  }
}

/**
 * Maps the API data for a character and its external information to the application's character model.
 *
 * This function performs the following steps:
 * 1. Maps each character's information, including name, birth year, eye color, gender, hair color, height, mass, skin color, and URL.
 * 2. Maps the homeworld information.
 * 3. Maps the titles of films, species, starships, and vehicles associated with the character.
 *
 * @param {MapCharacterProps} props - The properties containing the API data for the character and its external information.
 * @param {PersonAPI} props.character - The API data for the character.
 * @param {PlanetAPI} props.externalInfos.homeworld - The API data for the character's homeworld.
 * @param {FilmAPI[]} props.externalInfos.films - The API data for the films associated with the character.
 * @param {SpecieAPI[]} props.externalInfos.species - The API data for the species associated with the character.
 * @param {StarshipAPI[]} props.externalInfos.starships - The API data for the starships associated with the character.
 * @param {VehiclesAPI[]} props.externalInfos.vehicles - The API data for the vehicles associated with the character.
 * @returns {CharacterUI} The mapped character data.
 */
export function mapCharacter({ character, externalInfos }: MapCharacterProps): CharacterUI {
  return {
    name: character.name || 'Unknown',
    birthYear: character.birth_year || 'Unknown',
    eyeColor: character.eye_color || 'Unknown',
    gender: character.gender || 'Unknown',
    hairColor: character.hair_color || 'Unknown',
    height: character.height || 'Unknown',
    mass: character.mass || 'Unknown',
    skinColor: character.skin_color || 'Unknown',
    homeworld: {
      name: externalInfos.homeworld.name || 'Unknown',
      url: externalInfos.homeworld.url || '',
    },
    films: externalInfos.films.map((film) => film.title),
    species: externalInfos.species.map((specie) => specie.name),
    starships: externalInfos.starships.map((starship) => starship.name),
    vehicles: externalInfos.vehicles.map((vehicle) => vehicle.name),
    url: character.url || '',
  }
}
