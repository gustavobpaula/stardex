import { formatList } from './formatList'

describe('formatList', () => {
  it('should format a list of strings into a single string with items separated by commas', () => {
    const list = ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi']
    const result = formatList(list)
    expect(result).toBe('A New Hope, The Empire Strikes Back, Return of the Jedi')
  })

  it('should return "Unknown" if the list is empty', () => {
    const list: string[] = []
    const result = formatList(list)
    expect(result).toBe('Unknown')
  })

  it('should handle a list with one item correctly', () => {
    const list = ['A New Hope']
    const result = formatList(list)
    expect(result).toBe('A New Hope')
  })

  it('should handle a list with multiple items correctly', () => {
    const list = [
      'A New Hope',
      'The Empire Strikes Back',
      'Return of the Jedi',
      'The Phantom Menace',
    ]
    const result = formatList(list)
    expect(result).toBe(
      'A New Hope, The Empire Strikes Back, Return of the Jedi, The Phantom Menace',
    )
  })
})
