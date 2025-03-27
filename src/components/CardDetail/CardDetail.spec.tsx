import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardDetail, CardDetailProps } from './CardDetail'
import { Eye, Users } from 'lucide-react'

describe('CardDetail', () => {
  const defaultProps: CardDetailProps = {
    title: 'Character Details',
    description: 'Details of the character',
    content: [
      {
        title: 'Eye Color',
        value: 'Blue',
        Icon: Eye,
      },
      {
        title: 'Gender',
        value: 'Male',
        Icon: Users,
      },
    ],
  }

  it('should render the card title and description', () => {
    render(<CardDetail {...defaultProps} />)
    expect(screen.getByText('Character Details')).toBeInTheDocument()
    expect(screen.getByText('Details of the character')).toBeInTheDocument()
  })

  it('should render the content with titles, values, and icons', () => {
    render(<CardDetail {...defaultProps} />)
    expect(screen.getByText('Eye Color:')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Gender:')).toBeInTheDocument()
    expect(screen.getByText('Male')).toBeInTheDocument()
  })

  it('should render the content without icons if Icon is not provided', () => {
    const propsWithoutIcons: CardDetailProps = {
      ...defaultProps,
      content: [
        {
          title: 'Eye Color',
          value: 'Blue',
        },
        {
          title: 'Gender',
          value: 'Male',
        },
      ],
    }
    render(<CardDetail {...propsWithoutIcons} />)
    expect(screen.getByText('Eye Color:')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Gender:')).toBeInTheDocument()
    expect(screen.getByText('Male')).toBeInTheDocument()
  })
})
