import { useCharacterStore } from '@/store'
import { InitializerCharacterStore } from './InitializerCharacterStore'

export default async function Character() {
  const character = useCharacterStore.getState().character
  const loadCharacter = useCharacterStore.getState().loadCharacter

  await loadCharacter({ url: 'https://swapi.dev/api/people/1/' })

  console.log('character', character)

  return (
    <>
      <InitializerCharacterStore character={character} />
      <div className="flex flex-col p-4">
        <h1>{character.name} </h1>
      </div>
    </>
  )
}
