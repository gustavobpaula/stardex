'use client'

import { Breadcrumb, CardLoading, CardPlanet, Empty, Pagination, Search } from '@/components'
import { usePlanetsStore } from '@/store'
import { useCallback, useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'

export default function Planets() {
  const loadPlanets = usePlanetsStore((state) => state.loadPlanets)
  const isLoading = usePlanetsStore((state) => state.isLoading)
  const planets = usePlanetsStore((state) => state.planets)
  const total = usePlanetsStore((state) => state.total)
  const nextPage = usePlanetsStore((state) => state.nextPage)
  const previousPage = usePlanetsStore((state) => state.previousPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const handleNextPage = () => {
    if (nextPage) {
      loadPlanets(searchValue ? { search: searchValue, page: nextPage } : { page: nextPage })
      setCurrentPage(nextPage)
    }
  }

  const handlePreviousPage = () => {
    if (previousPage) {
      loadPlanets(
        searchValue ? { search: searchValue, page: previousPage } : { page: previousPage },
      )
      setCurrentPage(previousPage)
    }
  }

  const handlePage = (page: number) => {
    loadPlanets(searchValue ? { search: searchValue, page } : { page })
    setCurrentPage(page)
  }

  const handleSearch = useCallback(
    (value: string) => {
      loadPlanets({ search: value })
      setCurrentPage(1)
      setSearchValue(value)
    },
    [loadPlanets],
  )

  const content = useCallback(() => {
    if (planets === undefined || isLoading) {
      return new Array(10).fill(0).map((_, index) => <CardLoading key={index} />)
    }

    return planets.map((props, index) => <CardPlanet key={index} {...props} />)
  }, [planets, isLoading])

  useEffect(() => {
    loadPlanets()
  }, [loadPlanets])

  return (
    <div className="flex flex-col p-4">
      <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'Planets' }]} />
      <Separator className="my-4" />
      <Search onChange={handleSearch} className="self-end md:max-w-xs" debounceTime={1000} />
      {planets && planets.length === 0 ? (
        <Empty />
      ) : (
        <>
          <main className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5">
            {content()}
          </main>
          <nav className="flex justify-center py-4">
            <Pagination
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              onPage={handlePage}
              total={total}
              currentPage={currentPage}
            />
          </nav>
        </>
      )}
    </div>
  )
}
