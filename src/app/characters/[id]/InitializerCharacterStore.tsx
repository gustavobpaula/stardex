'use client'

import { useCharacterStore, CharactersStore } from '@/store'

export const InitializerCharacterStore = ({ character }: Pick<CharactersStore, 'character'>) => {
  useCharacterStore.setState({
    character,
  })

  return null
}
