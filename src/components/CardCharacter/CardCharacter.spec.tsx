import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardCharacter, CardCharacterProps } from './CardCharacter'
import { useFavoritesStore } from '@/store'

const mockCharacter: CardCharacterProps = {
  name: 'Luke Skywalker',
  height: '172',
  birthYear: '19BBY',
  homeworld: {
    name: 'Tatooine',
    url: 'https://swapi.dev/api/planets/1/',
  },
  url: 'https://swapi.dev/api/people/1/',
}

jest.mock('@/store', () => ({
  useFavoritesStore: jest.fn(),
}))

describe('CardCharacter', () => {
  beforeEach(() => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      addCharacterFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      favorites: {
        characters: [],
      },
    })
  })

  it('should render the character card with correct information', () => {
    render(<CardCharacter {...mockCharacter} />)

    // Check if the character title is present
    const title = screen.getByRole('heading', { name: /luke skywalker/i })
    expect(title).toBeInTheDocument()

    // Check if the character height is present
    const height = screen.getByText(/height/i)
    expect(height).toBeInTheDocument()
    const heightValue = screen.getByText(/172/i)
    expect(heightValue).toBeInTheDocument()

    // Check if the character birth year is present
    const birthYear = screen.getByText(/birthyear/i)
    expect(birthYear).toBeInTheDocument()
    const birthYearValue = screen.getByText(/19bby/i)
    expect(birthYearValue).toBeInTheDocument()

    // Check if the character's homeworld is present
    const homeworld = screen.getByText(/homeworld/i)
    expect(homeworld).toBeInTheDocument()
    const homeworldLink = screen.getByRole('link', { name: /homeworld: tatooine/i })
    expect(homeworldLink).toBeInTheDocument()
    expect(homeworldLink).toHaveAttribute('href', '/planets/1')

    // Check if the "load more" button is present
    const loadMoreButton = screen.getByRole('link', { name: /load more about luke skywalker/i })
    expect(loadMoreButton).toBeInTheDocument()
    expect(loadMoreButton).toHaveAttribute('href', '/characters/1')
  })

  it('should have accessible roles and labels', () => {
    render(<CardCharacter {...mockCharacter} />)

    // Check if the card has the role of region and is associated with the title
    const card = screen.getByRole('region', { name: /luke skywalker/i })
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute(
      'aria-labelledby',
      `character-${mockCharacter.url.split('/').slice(-2, -1)[0]}`,
    )
  })
})
