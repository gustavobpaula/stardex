import Link from 'next/link'
import { extractId } from './extractId'

export type GetListWithLinksProps = {
  list: Array<{
    url: string
    name: string
  }>
  baseRoute: string
}

/**
 * formatListWithLinks
 *
 * This function generates a list of links from an array of items.
 * Each item in the list is converted into a clickable link using the Next.js Link component.
 * The links are separated by commas, except for the last item.
 *
 * @param {GetListWithLinksProps} props - The properties containing the list of items and the base route for the links.
 * @param {Array<{ url: string, name: string }>} props.list - The list of items to be converted into links.
 * @param {string} props.baseRoute - The base route to be used for generating the links.
 * @returns {React.ReactNode} A list of clickable links separated by commas, or 'Unknown' if the list is empty.
 *
 * Usage:
 * ```tsx
 * const residents = [
 *   { url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker' },
 *   { url: 'https://swapi.dev/api/people/2/', name: 'C-3PO' },
 * ];
 * const baseRoute = '/characters';
 * const links = formatListWithLinks({ list: residents, baseRoute });
 * ```
 */
export const formatListWithLinks = ({ list, baseRoute }: GetListWithLinksProps) => {
  if (list.length === 0) {
    return 'Unknown'
  }
  return list.map((item, index) => {
    const itemId = extractId(item.url)
    return (
      <span key={itemId}>
        <Link
          className="text-red-400 underline-offset-4 transition-colors hover:text-red-500 hover:underline"
          href={`${baseRoute}/${itemId}`}
        >
          {item.name}
        </Link>
        {index < list.length - 1 && ', '}
      </span>
    )
  })
}
