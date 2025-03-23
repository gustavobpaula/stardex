import { ApiRequestOptions, request } from './request'
import { buildQueryString } from '@/utils'

jest.mock('@/utils', () => ({
  buildQueryString: jest.fn(),
}))

global.fetch = jest.fn()

describe('request', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should build the correct URL with query parameters for GET requests', async () => {
    ;(buildQueryString as jest.Mock).mockReturnValue('?key=value')
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 'test' }),
    })

    const options: ApiRequestOptions = {
      method: 'GET',
      url: 'https://api.example.com/resource',
      query: { key: 'value' },
    }

    const result = await request(options)

    expect(buildQueryString).toHaveBeenCalledWith({ key: 'value' })
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/resource?key=value', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
    })
    expect(result).toEqual({ data: 'test' })
  })

  it('should send the correct request for POST requests', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ data: 'test' }),
    })

    const options: ApiRequestOptions = {
      method: 'POST',
      url: 'https://api.example.com/resource',
      data: { key: 'value' },
    }

    const result = await request(options)

    expect(fetch).toHaveBeenCalledWith('https://api.example.com/resource', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'value' }),
    })
    expect(result).toEqual({ data: 'test' })
  })

  it('should throw an error if the response is not successful', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const options: ApiRequestOptions = {
      method: 'GET',
      url: 'https://api.example.com/resource',
    }

    await expect(request(options)).rejects.toThrow('Failed to fetch')
  })
})
