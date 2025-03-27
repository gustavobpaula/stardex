import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('should render the developer name', () => {
    render(<Footer />)

    // Check if the developer's name is rendered
    const developerName = screen.getByText(/developed by gustavo bento de paula/i)
    expect(developerName).toBeInTheDocument()
  })

  it('should render all social media links with correct attributes', () => {
    render(<Footer />)

    // Check if the GitHub link is present and has the correct attributes
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/gustavobpaula')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check if the LinkedIn link is present and has the correct attributes
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/gustavo-bento-de-paula/',
    )
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check if the Instagram link is present and has the correct attributes
    const instagramLink = screen.getByRole('link', { name: /instagram/i })
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/gustavobpaula/')
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render all social media icons', () => {
    render(<Footer />)

    // Check if the social media icons are rendered
    const githubIcon = screen.getByTestId('github-icon')
    const linkedinIcon = screen.getByTestId('linkedin-icon')
    const instagramIcon = screen.getByTestId('instagram-icon')

    expect(githubIcon).toBeInTheDocument()
    expect(linkedinIcon).toBeInTheDocument()
    expect(instagramIcon).toBeInTheDocument()
  })
})
