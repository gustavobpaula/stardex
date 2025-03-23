import { extractId } from './extractId'

describe('extractId', () => {
  it('should extract the ID from a given URL', () => {
    const url = 'https://swapi.dev/api/people/1/'
    const id = extractId(url)
    expect(id).toBe('1')
  })

  it('should extract the ID from a URL with different segments', () => {
    const url = 'https://swapi.dev/api/planets/5/'
    const id = extractId(url)
    expect(id).toBe('5')
  })

  it('should handle URLs with trailing slashes', () => {
    const url = 'https://swapi.dev/api/starships/9/'
    const id = extractId(url)
    expect(id).toBe('9')
  })

  it('should handle URLs without trailing slashes', () => {
    const url = 'https://swapi.dev/api/vehicles/14'
    const id = extractId(url)
    expect(id).toBe('14')
  })

  it('should return an empty string if the URL does not contain an ID', () => {
    const url = 'https://swapi.dev/api/people/'
    const id = extractId(url)
    expect(id).toBe('')
  })

  it('should handle URLs with query parameters', () => {
    const url = 'https://swapi.dev/api/people/1/?search=luke'
    const id = extractId(url)
    expect(id).toBe('1')
  })

  it('should handle URLs with hash fragments', () => {
    const url = 'https://swapi.dev/api/people/1/#details'
    const id = extractId(url)
    expect(id).toBe('1')
  })
})
