import { usePlanetStore } from '@/store'
import { InitializerPlanetStore } from './InitializerPlanetStore'
import Link from 'next/link'
import {
  CalendarRange,
  Clock,
  Diameter,
  Droplet,
  Mountain,
  SunSnow,
  User,
  Users,
  Weight,
} from 'lucide-react'
import { extractId } from '@/utils'
import { CardDetail, CardDetailProps } from '@/components/CardDetail'
import { Planet as PlanetUI } from '@/models'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Separator } from '@/components/ui/separator'

export default async function Planet({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const loadPlanet = usePlanetStore.getState().loadPlanet
  const planet = await Promise.resolve()
    .then(() => loadPlanet({ id }))
    .then(() => usePlanetStore.getState().planet)

  const getResidents = (residents: PlanetUI['residents']) => {
    if (residents.length === 0) {
      return 'Unknown'
    }
    return residents.map((resident, index) => {
      const residentId = extractId(resident.url)
      return (
        <span key={residentId}>
          <Link
            className="text-red-400 underline-offset-4 transition-colors hover:text-red-500 hover:underline"
            href={`/characters/${residentId}`}
          >
            {resident.name}
          </Link>
          {index < residents.length - 1 && ', '}
        </span>
      )
    })
  }

  const contentCardDetail: CardDetailProps['content'] = [
    {
      title: 'Climate',
      value: planet.climate,
      Icon: SunSnow,
    },
    {
      title: 'Diameter',
      value: `${planet.diameter} km`,
      Icon: Diameter,
    },
    {
      title: 'Gravity',
      value: planet.gravity,
      Icon: Weight,
    },
    {
      title: 'Orbital Period',
      value: `${planet.orbitalPeriod} days`,
      Icon: CalendarRange,
    },
    {
      title: 'Population',
      value: planet.population,
      Icon: Users,
    },
    {
      title: 'Residents',
      value: getResidents(planet.residents),
      Icon: User,
    },
    {
      title: 'Rotation Period',
      value: `${planet.rotationPeriod} hours`,
      Icon: Clock,
    },
    {
      title: 'Surface Water',
      value: `${planet.surfaceWater}%`,
      Icon: Droplet,
    },
    {
      title: 'Terrain',
      value: planet.terrain,
      Icon: Mountain,
    },
  ]

  return (
    <div className="p-4">
      <InitializerPlanetStore planet={planet} />
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          { label: 'Planets', url: '/planets' },
          { label: planet.name },
        ]}
      />
      <Separator className="my-4" />
      <main>
        <article className="mx-auto max-w-3xl p-4">
          <CardDetail
            title={planet.name}
            description={`Orbital/Rotation: ${planet.orbitalPeriod} / ${planet.rotationPeriod}`}
            content={contentCardDetail}
          />
        </article>
      </main>
    </div>
  )
}
