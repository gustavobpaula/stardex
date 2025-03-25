import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Star, StarOff } from 'lucide-react'
import { CharactersListItem } from '@/models'
import { extractId } from '@/utils'
import { useFavoritesStore } from '@/store'
import { useCallback } from 'react'

export type CardCharacterProps = CharactersListItem

export const CardCharacter = ({ name, birthYear, height, homeworld, url }: CardCharacterProps) => {
  const homeworldRoute = `/planets/${extractId(homeworld.url)}`
  const characterId = extractId(url)
  const characterRoute = `/characters/${characterId}`
  const addCharacterFavorite = useFavoritesStore((state) => state.addCharacterFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const isFavorite = useFavoritesStore((state) =>
    state.favorites.characters.some((character) => character.url === url),
  )

  const onAddFavorite = useCallback(
    () => addCharacterFavorite({ name, birthYear, height, homeworld, url }),
    [addCharacterFavorite, birthYear, height, homeworld, name, url],
  )
  const onRemoveFavorite = useCallback(
    () => removeFavorite('characters', url),
    [removeFavorite, url],
  )

  return (
    <Card
      className="w-full max-w-xs justify-self-center"
      role="region"
      aria-labelledby={`character-${characterId}`}
    >
      <CardHeader className="flex justify-between">
        <CardTitle role="heading" id={`character-${characterId}`}>
          {name}
        </CardTitle>
        {isFavorite ? (
          <StarOff
            onClick={onRemoveFavorite}
            className="cursor-pointer"
            role="button"
            aria-label={`Remove ${name} from favorites`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onRemoveFavorite()
              }
            }}
          />
        ) : (
          <Star
            onClick={onAddFavorite}
            className="cursor-pointer"
            role="button"
            aria-label={`Add ${name} to favorites`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onAddFavorite()
              }
            }}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2">
          <p>Height</p>
          <strong className="justify-self-end">{height}</strong>
          <p>Birthyear</p>
          <strong className="justify-self-end">{birthYear}</strong>
          <p>Homeworld</p>
          <strong className="justify-self-end">
            <Link href={homeworldRoute} aria-label={`Homeworld: ${homeworld.name}`}>
              {homeworld.name}
            </Link>
          </strong>
        </div>
      </CardContent>
      <CardFooter className="inline-flex justify-center">
        <Button asChild>
          <Link href={characterRoute} aria-label={`Load more about ${name}`}>
            load more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
