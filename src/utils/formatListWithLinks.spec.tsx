import { render } from '@testing-library/react'
import { formatListWithLinks, GetListWithLinksProps } from './formatListWithLinks'

describe('formatListWithLinks', () => {
  it('should generate a list of links from an array of items', () => {
    const props: GetListWithLinksProps = {
      list: [
        { url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker' },
        { url: 'https://swapi.dev/api/people/2/', name: 'C-3PO' },
      ],
      baseRoute: '/characters',
    }
    const { container } = render(<>{formatListWithLinks(props)}</>)
    expect(container.textContent).toBe('Luke Skywalker, C-3PO')
    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/characters/1')
    expect(links[1]).toHaveAttribute('href', '/characters/2')
  })

  it('should return "Unknown" if the list is empty', () => {
    const props: GetListWithLinksProps = {
      list: [],
      baseRoute: '/characters',
    }
    const { container } = render(<>{formatListWithLinks(props)}</>)
    expect(container.textContent).toBe('Unknown')
  })

  it('should handle a list with one item correctly', () => {
    const props: GetListWithLinksProps = {
      list: [{ url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker' }],
      baseRoute: '/characters',
    }
    const { container } = render(<>{formatListWithLinks(props)}</>)
    expect(container.textContent).toBe('Luke Skywalker')
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/characters/1')
  })

  it('should handle a list with multiple items correctly', () => {
    const props: GetListWithLinksProps = {
      list: [
        { url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker' },
        { url: 'https://swapi.dev/api/people/2/', name: 'C-3PO' },
        { url: 'https://swapi.dev/api/people/3/', name: 'R2-D2' },
      ],
      baseRoute: '/characters',
    }
    const { container } = render(<>{formatListWithLinks(props)}</>)
    expect(container.textContent).toBe('Luke Skywalker, C-3PO, R2-D2')
    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute('href', '/characters/1')
    expect(links[1]).toHaveAttribute('href', '/characters/2')
    expect(links[2]).toHaveAttribute('href', '/characters/3')
  })
})
