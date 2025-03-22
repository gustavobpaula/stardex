type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  url: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

/**
 * Makes an HTTP request and returns the response data.
 *
 * This function performs the following steps:
 * 1. Sends an HTTP request using the Fetch API with the provided options.
 * 2. Checks if the response is successful (status code 2xx).
 * 3. Parses and returns the response data as JSON.
 *
 * @template T The expected response type.
 * @param {ApiRequestOptions} options The options for the HTTP request.
 * @returns {Promise<T>} A promise that resolves to the response data.
 * @throws {Error} Throws an error if the fetch operation fails or the response is not successful.
 */
export const request = async <T>(options: ApiRequestOptions): Promise<T> => {
  const res = await fetch(options.url, {
	method: options.method || 'GET',
	headers: {
	  'Content-Type': 'application/json',
	  ...options.headers,
	},
	body: options.data ? JSON.stringify(options.data) : undefined,
  });

  if (!res.ok) {
	throw new Error('Failed to fetch');
  }

  return res.json();
}