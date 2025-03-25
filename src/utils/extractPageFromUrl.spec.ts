import { extractPageFromUrl } from './extractPageFromUrl'

describe('extractPageFromUrl', () => {
  it('should extract the page number from a valid URL', () => {
    const url = 'https://example.com/api/resource?page=3'
    const page = extractPageFromUrl(url)
    expect(page).toBe(3)
  })

  it('should return null if the page parameter is not present', () => {
    const url = 'https://example.com/api/resource'
    const page = extractPageFromUrl(url)
    expect(page).toBeNull()
  })

  it('should return null if the URL is invalid', () => {
    const url = 'invalid-url'
    const page = extractPageFromUrl(url)
    expect(page).toBeNull()
  })

  it('should return null if the page parameter is not a number', () => {
    const url = 'https://example.com/api/resource?page=abc'
    const page = extractPageFromUrl(url)
    expect(page).toBeNull()
  })

  it('should return null if the page parameter is empty', () => {
    const url = 'https://example.com/api/resource?page='
    const page = extractPageFromUrl(url)
    expect(page).toBeNull()
  })
})
