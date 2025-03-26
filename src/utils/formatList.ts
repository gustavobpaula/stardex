/**
 * formatList
 *
 * This function formats a list of strings into a single string with items separated by commas.
 * If the list is empty, it returns 'Unknown'.
 *
 * @param {string[]} list - The list of strings to format.
 * @returns {string} A formatted string with items separated by commas, or 'Unknown' if the list is empty.
 *
 * Usage:
 * ```typescript
 * const films = ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'];
 * const formattedFilms = formatList(films);
 * // Output: 'A New Hope, The Empire Strikes Back, Return of the Jedi'
 * ```
 */
export const formatList = (list: string[]) => {
  return list.length > 0 ? list.join(', ') : 'Unknown'
}
