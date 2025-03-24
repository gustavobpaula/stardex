import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Character } from '@/models'
import { extractId } from '@/utils'

export type CardCharacterProps = Pick<
  Character,
  'name' | 'height' | 'birthYear' | 'homeworld' | 'url'
>

export const CardCharacter = ({ name, birthYear, height, homeworld, url }: CardCharacterProps) => {
  const homeworldRoute = `/planets/${extractId(homeworld.url)}`
  const characterId = extractId(url)
  const characterRoute = `/characters/${characterId}`

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
        <Star />
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
