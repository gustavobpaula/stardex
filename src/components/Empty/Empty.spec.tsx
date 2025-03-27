import React from 'react'
import { render, screen } from '@testing-library/react'
import { Empty } from './Empty'
import '@testing-library/jest-dom'

describe('Empty', () => {
  it('should render the Empty component with the correct image', () => {
    render(<Empty />)

    // Check if the image is rendered with the correct attributes
    const image = screen.getByAltText('Empty')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Empty')
  })
})
