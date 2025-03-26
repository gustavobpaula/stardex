import { usePlanetStore } from '@/store'
import { InitializerPlanetStore } from './InitializerPlanetStore'
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
import { formatListWithLinks } from '@/utils'
import { CardDetail, CardDetailProps } from '@/components/CardDetail'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Separator } from '@/components/ui/separator'

export default async function Planet({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const loadPlanet = usePlanetStore.getState().loadPlanet
  const planet = await Promise.resolve()
    .then(() => loadPlanet({ id }))
    .then(() => usePlanetStore.getState().planet)

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
      value: formatListWithLinks({ list: planet.residents, baseRoute: '/characters' }),
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
