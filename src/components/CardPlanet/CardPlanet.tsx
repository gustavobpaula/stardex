import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Star, StarOff } from 'lucide-react'
import { PlanetsListItem } from '@/models'
import { extractId } from '@/utils'
import { useFavoritesStore } from '@/store'
import { useCallback } from 'react'

export type CardPlanetProps = PlanetsListItem

export const CardPlanet = ({
  name,
  climate,
  orbitalPeriod,
  rotationPeriod,
  residents,
  url,
}: CardPlanetProps) => {
  const planetId = extractId(url)
  const planetRoute = `/planets/${planetId}`
  const addPlanetFavorite = useFavoritesStore((state) => state.addPlanetFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const isFavorite = useFavoritesStore((state) =>
    state.favorites.planets.some((planet) => planet.url === url),
  )

  const onAddFavorite = useCallback(
    () => addPlanetFavorite({ name, climate, orbitalPeriod, rotationPeriod, residents, url }),
    [addPlanetFavorite, climate, name, orbitalPeriod, residents, rotationPeriod, url],
  )
  const onRemoveFavorite = useCallback(() => removeFavorite('planets', url), [removeFavorite, url])

  return (
    <Card
      className="w-full max-w-xs justify-between justify-self-center"
      role="region"
      aria-labelledby={`planet-${planetId}`}
    >
      <CardHeader className="flex justify-between">
        <CardTitle role="heading" id={`planet-${planetId}`}>
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
          <p>Orbital/Rotation</p>
          <strong className="justify-self-end text-right">{`${orbitalPeriod} / ${rotationPeriod}`}</strong>
          <p>Climate</p>
          <strong className="justify-self-end text-right">{climate}</strong>
          <p>Residents</p>
          <ul className="justify-self-end text-right">
            {residents.length === 0 ? (
              <li>
                <strong>None</strong>
              </li>
            ) : (
              residents.slice(0, 2).map((resident, index) => (
                <li key={index}>
                  <strong>
                    <Link
                      href={`/${extractId(resident.url)}`}
                      aria-label={`Resident: ${resident.name}`}
                    >
                      {resident.name}
                    </Link>
                  </strong>
                </li>
              ))
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="inline-flex justify-center">
        <Button asChild>
          <Link href={planetRoute} aria-label={`Load more about ${name}`}>
            load more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
