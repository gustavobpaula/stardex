/**
 * Builds a query string from an object of query parameters.
 *
 * This function performs the following steps:
 * 1. Checks if the query object is provided. If not, returns an empty string.
 * 2. Creates a new URLSearchParams object.
 * 3. Iterates over the entries of the query object and appends each key-value pair to the URLSearchParams object.
 * 4. Converts the URLSearchParams object to a string and returns it prefixed with a '?' if it is not empty.
 *
 * @param {Record<string, string | number | boolean>} [query] - The object containing query parameters.
 * @returns {string} The constructed query string.
 */
export const buildQueryString = (query?: Record<string, string | number | boolean>): string => {
  if (!query) return ''
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    params.append(key, String(value))
  })
  return params.toString() ? `?${params.toString()}` : ''
}
