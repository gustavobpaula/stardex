import { useCharacterStore } from '@/store'
import { InitializerCharacterStore } from './InitializerCharacterStore'
import Link from 'next/link'
import {
  Eye,
  PaintBucket,
  Ruler,
  Earth,
  Film,
  Rocket,
  CarFront,
  Users,
  Palette,
  Scale,
} from 'lucide-react'
import { extractId } from '@/utils'
import { CardDetail, CardDetailProps } from '@/components/CardDetail'

export default async function Character({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const loadCharacter = useCharacterStore.getState().loadCharacter
  const character = await Promise.resolve()
    .then(() => loadCharacter({ id }))
    .then(() => useCharacterStore.getState().character)

  const getLists = (list: string[]) => {
    return list.length > 0 ? list.join(', ') : 'Unknown'
  }

  const homeworldRoute = `/planets/${extractId(character.homeworld.url)}`

  const contentCardDetail: CardDetailProps['content'] = [
    {
      title: 'Eye Color',
      value: character.eyeColor,
      Icon: Eye,
    },
    {
      title: 'Gender',
      value: character.gender,
      Icon: Users,
    },
    {
      title: 'Hair Color',
      value: character.hairColor,
      Icon: Palette,
    },
    {
      title: 'Height',
      value: `${character.height} cm`,
      Icon: Ruler,
    },
    {
      title: 'Mass',
      value: `${character.mass} kg`,
      Icon: Scale,
    },
    {
      title: 'Skin Color',
      value: character.skinColor,
      Icon: PaintBucket,
    },
    {
      title: 'Homeworld',
      value: (
        <Link
          className="text-red-400 underline-offset-4 transition-colors hover:text-red-500 hover:underline"
          href={homeworldRoute}
        >
          {character.homeworld.name}
        </Link>
      ),
      Icon: Earth,
    },
    {
      title: 'Films',
      value: getLists(character.films),
      Icon: Film,
    },
    {
      title: 'Starships',
      value: getLists(character.starships),
      Icon: Rocket,
    },
    {
      title: 'Vehicles',
      value: getLists(character.vehicles),
      Icon: CarFront,
    },
  ]

  return (
    <>
      <InitializerCharacterStore character={character} />
      <main>
        <article className="mx-auto max-w-3xl p-4">
          <CardDetail
            title={character.name}
            description={`Birthyear: ${character.birthYear}`}
            content={contentCardDetail}
          />
        </article>
      </main>
    </>
  )
}
