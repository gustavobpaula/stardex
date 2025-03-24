/**
 * Extracts the page number from a given URL.
 *
 * This function parses the provided URL and extracts the value of the `page` query parameter.
 * If the `page` parameter is present, it converts the value to an integer and returns it.
 * If the `page` parameter is not present or the URL is invalid, it returns `null`.
 *
 * @param {string} url - The URL from which to extract the page number.
 * @returns {number | null} The extracted page number, or `null` if the `page` parameter is not present or the URL is invalid.
 */
export function extractPageFromUrl(url: string): number | null {
  try {
    const parsedUrl = new URL(url)
    const page = parsedUrl.searchParams.get('page')
    return page ? parseInt(page, 10) : null
  } catch (error) {
    console.error('Invalid URL:', error)
    return null
  }
}
