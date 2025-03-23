/**
 * Extracts the ID from a given URL.
 *
 * This function performs the following steps:
 * 1. Uses a regular expression to match all numeric segments in the URL.
 * 2. Returns the last matched numeric segment as the ID.
 *
 * @param {string} url - The URL from which to extract the ID.
 * @returns {string} The extracted ID, or an empty string if no numeric segment is found.
 */
export function extractId(url: string): string {
  const match = url.match(/(\d+)(?=[/?#]|$)/g)
  return match ? match[match.length - 1] : ''
}
