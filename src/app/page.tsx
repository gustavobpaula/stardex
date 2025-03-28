'use client'

import { CardLoading, CardCharacter, Pagination, Search, Empty, Breadcrumb } from '@/components'
import { useCharactersStore } from '@/store'
import { useCallback, useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'

export default function Characters() {
  const loadCharacters = useCharactersStore((state) => state.loadCharacters)
  const isLoading = useCharactersStore((state) => state.isLoading)
  const characters = useCharactersStore((state) => state.characters)
  const total = useCharactersStore((state) => state.total)
  const nextPage = useCharactersStore((state) => state.nextPage)
  const previousPage = useCharactersStore((state) => state.previousPage)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  const handleNextPage = () => {
    if (nextPage) {
      loadCharacters(searchValue ? { search: searchValue, page: nextPage } : { page: nextPage })
      setCurrentPage(nextPage)
    }
  }

  const handlePreviousPage = () => {
    if (previousPage) {
      loadCharacters(
        searchValue ? { search: searchValue, page: previousPage } : { page: previousPage },
      )
      setCurrentPage(previousPage)
    }
  }

  const handlePage = (page: number) => {
    loadCharacters(searchValue ? { search: searchValue, page } : { page })
    setCurrentPage(page)
  }

  const handleSearch = useCallback(
    (value: string) => {
      loadCharacters({ search: value })
      setCurrentPage(1)
      setSearchValue(value)
    },
    [loadCharacters],
  )

  const content = useCallback(() => {
    if (characters === undefined || isLoading) {
      return Array.from({ length: 10 }, (_, index) => <CardLoading key={index} />)
    }

    return characters.map((props, index) => <CardCharacter key={index} {...props} />)
  }, [characters, isLoading])

  useEffect(() => {
    loadCharacters()
  }, [loadCharacters])

  return (
    <div className="flex flex-col p-4">
      <Breadcrumb items={[{ label: 'Home' }, { label: 'Characters' }]} />
      <Separator className="my-4" />
      <Search onChange={handleSearch} className="self-end md:max-w-xs" debounceTime={1000} />
      {characters && characters.length === 0 ? (
        <Empty />
      ) : (
        <>
          <main className="grid grid-cols-1 gap-4 py-4 align-middle sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5">
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
