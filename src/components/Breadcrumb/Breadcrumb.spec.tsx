import React from 'react'
import { render, screen } from '@testing-library/react'
import { Breadcrumb, BreadcrumbProps } from './Breadcrumb'
import '@testing-library/jest-dom'

describe('Breadcrumb', () => {
  const mockBreadcrumbItems: BreadcrumbProps['items'] = [
    { label: 'Home', url: '/' },
    { label: 'Characters', url: '/characters' },
    { label: 'Luke Skywalker' },
  ]

  it('should render all breadcrumb items except the last one as links', () => {
    render(<Breadcrumb items={mockBreadcrumbItems} />)

    // Check if the first two items are rendered as links
    const homeLink = screen.getByRole('link', { name: /home/i })
    const charactersLink = screen.getByRole('link', { name: /characters/i })

    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    expect(charactersLink).toBeInTheDocument()
    expect(charactersLink).toHaveAttribute('href', '/characters')
  })

  it('should render the last breadcrumb item as plain text', () => {
    render(<Breadcrumb items={mockBreadcrumbItems} />)

    // Check if the last item is rendered as plain text
    const lastItem = screen.getByText(/luke skywalker/i)
    expect(lastItem).toBeInTheDocument()
    expect(lastItem.tagName).toBe('SPAN') // Assuming BreadcrumbPage renders as a <span>
  })

  it('should handle a single breadcrumb item correctly', () => {
    const singleItem = [{ label: 'Home' }]
    render(<Breadcrumb items={singleItem} />)

    // Check if the single item is rendered as plain text
    const singleBreadcrumb = screen.getByText(/home/i)
    expect(singleBreadcrumb).toBeInTheDocument()
    expect(singleBreadcrumb.tagName).toBe('SPAN') // Assuming BreadcrumbPage renders as a <span>
  })
})
