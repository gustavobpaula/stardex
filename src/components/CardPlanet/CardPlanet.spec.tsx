import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardPlanet, CardPlanetProps } from './CardPlanet'
import { useFavoritesStore } from '@/store'
import '@testing-library/jest-dom'

jest.mock('@/store', () => ({
  useFavoritesStore: jest.fn(),
}))

const mockPlanet: CardPlanetProps = {
  name: 'Tatooine',
  climate: 'Arid',
  orbitalPeriod: '304',
  rotationPeriod: '23',
  residents: [
    { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
    { name: 'C-3PO', url: 'https://swapi.dev/api/people/2/' },
  ],
  url: 'https://swapi.dev/api/planets/1/',
}

describe('CardPlanet', () => {
  const mockAddFavorite = jest.fn()
  const mockRemoveFavorite = jest.fn()

  beforeEach(() => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      addPlanetFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      favorites: {
        planets: [],
      },
    })
  })

  it('should render the planet card with correct information', () => {
    render(<CardPlanet {...mockPlanet} />)

    // Check if the planet title is present
    const title = screen.getByRole('heading', { name: /tatooine/i })
    expect(title).toBeInTheDocument()

    // Check if the planet details are present
    expect(screen.getByText('Orbital/Rotation')).toBeInTheDocument()
    expect(screen.getByText('304 / 23')).toBeInTheDocument()
    expect(screen.getByText('Climate')).toBeInTheDocument()
    expect(screen.getByText('Arid')).toBeInTheDocument()

    // Check if the residents are present
    const residentLinks = screen.getAllByRole('link', { name: /resident:/i })
    expect(residentLinks).toHaveLength(2)
    expect(residentLinks[0]).toHaveAttribute('href', '/1')
    expect(residentLinks[1]).toHaveAttribute('href', '/2')
  })

  it('should render "None" if there are no residents', () => {
    const planetWithoutResidents = { ...mockPlanet, residents: [] }
    render(<CardPlanet {...planetWithoutResidents} />)
    expect(screen.getByText('Residents')).toBeInTheDocument()
    expect(screen.getByText('None')).toBeInTheDocument()
  })

  it('should have accessible roles and labels', () => {
    render(<CardPlanet {...mockPlanet} />)

    // Check if the card has the role of region and is associated with the title
    const card = screen.getByRole('region', { name: /tatooine/i })
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute(
      'aria-labelledby',
      `planet-${mockPlanet.url.split('/').slice(-2, -1)[0]}`,
    )
  })
})
