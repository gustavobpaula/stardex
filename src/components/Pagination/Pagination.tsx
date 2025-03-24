import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useCallback, useMemo } from 'react'

export type PaginationProps = {
  total: number
  onNextPage(): void
  onPreviousPage(): void
  onPage(page: number): void
  currentPage: number
}

/**
 * Pagination component to navigate through pages.
 *
 * This component displays pagination controls including page numbers, ellipses, and next/previous buttons.
 * It dynamically adjusts the displayed page numbers based on the current page and total pages.
 *
 * @param {number} total - The total number of items.
 * @param {number} currentPage - The current active page.
 * @param {function} onNextPage - Function to call when the next page button is clicked.
 * @param {function} onPreviousPage - Function to call when the previous page button is clicked.
 * @param {function} onPage - Function to call when a specific page number is clicked.
 * @returns {JSX.Element} The rendered pagination component.
 */
export const Pagination = ({
  total,
  currentPage,
  onNextPage,
  onPreviousPage,
  onPage,
}: PaginationProps) => {
  const totalPages = useMemo(() => Math.ceil(total / 10), [total])
  const pagesToShow = 3

  /**
   * Creates a pagination item.
   *
   * @param {number} page - The page number for the item.
   * @returns {JSX.Element} The pagination item element.
   */
  const createPaginationItem = useCallback(
    (page: number) => (
      <PaginationItem key={page}>
        <PaginationLink
          href={'#'}
          isActive={currentPage === page}
          onClick={() => onPage(page)}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ),
    [currentPage, onPage],
  )

  /**
   * Renders dynamic pagination pages based on the current page and total pages.
   *
   * @param {number} totalPages - The total number of pages.
   * @returns {JSX.Element[]} An array of pagination item elements.
   */
  const renderDynamicPages = useCallback(
    (totalPages: number) => {
      const pages = []

      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(createPaginationItem(i))
        }
        pages.push(<PaginationEllipsis key="ellipsis-end" aria-hidden="true" />)
        pages.push(createPaginationItem(totalPages))
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push(createPaginationItem(1))
        pages.push(<PaginationEllipsis key="ellipsis-start" aria-hidden="true" />)
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(createPaginationItem(i))
        }
        pages.push(<PaginationEllipsis key="ellipsis-end" aria-hidden="true" />)
        pages.push(createPaginationItem(totalPages))
      } else {
        pages.push(createPaginationItem(1))
        pages.push(<PaginationEllipsis key="ellipsis-start" aria-hidden="true" />)
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(createPaginationItem(i))
        }
      }

      return pages
    },
    [createPaginationItem, currentPage],
  )

  /**
   * Renders the page links based on the total pages and current page.
   *
   * @param {number} totalPages - The total number of pages.
   * @returns {JSX.Element[]} An array of pagination item elements.
   */
  const renderPageLinks = useCallback(
    (totalPages: number) => {
      if (totalPages <= pagesToShow + 1) {
        return [...Array(totalPages)].map((_, index) => createPaginationItem(index + 1))
      } else {
        return renderDynamicPages(totalPages)
      }
    },
    [createPaginationItem, renderDynamicPages, pagesToShow],
  )

  return (
    <PaginationUI aria-label="Pagination Navigation">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={'#'} onClick={onPreviousPage} aria-label="Previous Page" />
        </PaginationItem>
        {renderPageLinks(totalPages)}
        <PaginationItem>
          <PaginationNext href={'#'} onClick={onNextPage} aria-label="Next Page" />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  )
}
