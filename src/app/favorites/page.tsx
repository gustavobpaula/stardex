'use client'

import { CardPlanet, CardCharacter, Empty, Breadcrumb } from '@/components'
import { useFavoritesStore } from '@/store'
import React, { useCallback } from 'react'
import { Separator } from '@/components/ui/separator'

export default function Favorites() {
  const { characters, planets } = useFavoritesStore((state) => state.favorites)

  const charactersContent = useCallback(() => {
    return characters.map((props, index) => <CardCharacter key={index} {...props} />)
  }, [characters])

  const planetsContent = useCallback(() => {
    return planets.map((props, index) => <CardPlanet key={index} {...props} />)
  }, [planets])

  const sectionContent = (title: string, content: React.ReactNode) => {
    return (
      <section className="mb-8">
        <h2 className="text-center text-2xl font-bold">{title}</h2>
        <div className="grid grid-cols-1 gap-4 py-4 align-middle sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5">
          {content}
        </div>
      </section>
    )
  }

  if (characters.length === 0 && planets.length === 0) {
    return <Empty />
  }

  return (
    <div className="flex flex-col p-4">
      <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'Favorites' }]} />
      <Separator className="my-4" />
      <main className="flex flex-col p-4">
        {characters.length > 0 && sectionContent('Characters', charactersContent())}
        {planets.length > 0 && sectionContent('Planets', planetsContent())}
      </main>
    </div>
  )
}
