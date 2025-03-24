import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardLoading } from './CardLoading'

describe('CardLoading', () => {
  it('should render the loading card with skeleton elements', () => {
    render(<CardLoading />)

    const card = screen.getByRole('region', { name: /loading card content/i })
    expect(card).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByLabelText(/loading card content/i)).toBeInTheDocument()
  })
})
