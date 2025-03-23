import { buildQueryString } from './buildQueryString'

describe('buildQueryString', () => {
  it('should return an empty string if no query object is provided', () => {
    expect(buildQueryString()).toBe('')
  })

  it('should return an empty string if the query object is empty', () => {
    expect(buildQueryString({})).toBe('')
  })

  it('should build a query string from a single key-value pair', () => {
    const query = { key: 'value' }
    expect(buildQueryString(query)).toBe('?key=value')
  })

  it('should build a query string from multiple key-value pairs', () => {
    const query = { key1: 'value1', key2: 'value2' }
    expect(buildQueryString(query)).toBe('?key1=value1&key2=value2')
  })

  it('should handle numeric values', () => {
    const query = { key: 123 }
    expect(buildQueryString(query)).toBe('?key=123')
  })

  it('should handle boolean values', () => {
    const query = { key: true }
    expect(buildQueryString(query)).toBe('?key=true')
  })

  it('should handle mixed types of values', () => {
    const query = { key1: 'value1', key2: 123, key3: true }
    expect(buildQueryString(query)).toBe('?key1=value1&key2=123&key3=true')
  })
})
