'use client'

import { CardLoading, CardCharacter, Pagination } from '@/components'
import { useCharactersStore } from '@/store'
import { useCallback, useEffect, useState } from 'react'

export default function Characters() {
  const loadCharacters = useCharactersStore((state) => state.loadCharacters)
  const isLoading = useCharactersStore((state) => state.isLoading)
  const characters = useCharactersStore((state) => state.characters)
  const total = useCharactersStore((state) => state.total)
  const nextPage = useCharactersStore((state) => state.nextPage)
  const previousPage = useCharactersStore((state) => state.previousPage)
  const [currentPage, setCurrentPage] = useState(1)

  const handleNextPage = () => {
    if (nextPage) {
      loadCharacters({ page: nextPage })
      setCurrentPage(nextPage)
    }
  }

  const handlePreviousPage = () => {
    if (previousPage) {
      loadCharacters({ page: previousPage })
      setCurrentPage(previousPage)
    }
  }

  const handlePage = (page: number) => {
    loadCharacters({ page })
    setCurrentPage(page)
  }

  const content = useCallback(() => {
    if (isLoading) {
      const array = new Array(10).fill(0)
      return array.map((_, index) => <CardLoading key={index} />)
    }

    return characters.map((props, index) => <CardCharacter key={index} {...props} />)
  }, [characters, isLoading])

  useEffect(() => {
    console.log('nextPage', nextPage)
  }, [nextPage])

  useEffect(() => {
    loadCharacters()
  }, [loadCharacters])

  return (
    <>
      <main className="grid grid-cols-1 gap-4 p-4 align-middle sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5">
        {content()}
      </main>
      <nav className="flex justify-center p-4">
        <Pagination
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onPage={handlePage}
          total={total}
          currentPage={currentPage}
        />
      </nav>
    </>
  )
}
