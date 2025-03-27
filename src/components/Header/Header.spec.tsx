import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'
import '@testing-library/jest-dom'
import { usePathname } from 'next/navigation'

// Mock the usePathname hook from Next.js
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const activeLinkClass = 'font-black underline underline-offset-8'

describe('Header', () => {
  it('should render the logo with the correct attributes', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')

    render(<Header />)

    // Check if the logo is rendered
    const logo = screen.getByAltText('Star Dex')
    expect(logo).toBeInTheDocument()
  })

  it('should highlight the "Characters" link when on the "/" route', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')

    render(<Header />)

    // Check if the "Characters" link is active
    const charactersLink = screen.getByRole('link', { name: /characters/i })
    expect(charactersLink).toHaveClass(activeLinkClass)
  })

  it('should highlight the "Planets" link when on the "/planets" route', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/planets')

    render(<Header />)

    // Check if the "Planets" link is active
    const planetsLink = screen.getByRole('link', { name: /planets/i })
    expect(planetsLink).toHaveClass(activeLinkClass)
  })

  it('should highlight the "Favorites" link when on the "/favorites" route', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/favorites')

    render(<Header />)

    // Check if the "Favorites" link is active
    const favoritesLink = screen.getByRole('link', { name: /favorites/i })
    expect(favoritesLink).toHaveClass(activeLinkClass)
  })

  it('should not highlight any link when on an unrelated route', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/unrelated')

    render(<Header />)

    // Check if no links are active
    const charactersLink = screen.getByRole('link', { name: /characters/i })
    const planetsLink = screen.getByRole('link', { name: /planets/i })
    const favoritesLink = screen.getByRole('link', { name: /favorites/i })

    expect(charactersLink).not.toHaveClass(activeLinkClass)
    expect(planetsLink).not.toHaveClass(activeLinkClass)
    expect(favoritesLink).not.toHaveClass(activeLinkClass)
  })
})
