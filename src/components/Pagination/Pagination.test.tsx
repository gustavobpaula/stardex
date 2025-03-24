import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      total: 100,
      currentPage: 1,
      onNextPage: jest.fn(),
      onPreviousPage: jest.fn(),
      onPage: jest.fn(),
    }
    return render(<Pagination {...defaultProps} {...props} />)
  }

  test('renders pagination component', () => {
    const { getByText, queryByText } = setup()
    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
    expect(getByText('4')).toBeInTheDocument()
    expect(queryByText('9')).not.toBeInTheDocument()
    expect(getByText('10')).toBeInTheDocument()
  })

  test('calls onNextPage when next button is clicked', () => {
    const onNextPage = jest.fn()
    const { getByLabelText } = setup({ onNextPage })
    fireEvent.click(getByLabelText('Next Page'))
    expect(onNextPage).toHaveBeenCalled()
  })

  test('calls onPreviousPage when previous button is clicked', () => {
    const onPreviousPage = jest.fn()
    const { getByLabelText } = setup({ onPreviousPage })
    fireEvent.click(getByLabelText('Previous Page'))
    expect(onPreviousPage).toHaveBeenCalled()
  })

  test('calls onPage when a page number is clicked', () => {
    const onPage = jest.fn()
    const { getByText } = setup({ onPage })
    fireEvent.click(getByText('2'))
    expect(onPage).toHaveBeenCalledWith(2)
  })

  test('renders correct pages when currentPage is in the middle', () => {
    const { getByText, queryByText } = setup({ currentPage: 5 })
    expect(getByText('1')).toBeInTheDocument()
    expect(queryByText('2')).not.toBeInTheDocument()
    expect(getByText('4')).toBeInTheDocument()
    expect(getByText('5')).toBeInTheDocument()
    expect(getByText('6')).toBeInTheDocument()
    expect(getByText('10')).toBeInTheDocument()
  })

  test('renders correct pages when currentPage is at the end', () => {
    const { getByText, queryByText } = setup({ currentPage: 10 })
    expect(getByText('1')).toBeInTheDocument()
    expect(queryByText('2')).not.toBeInTheDocument()
    expect(getByText('7')).toBeInTheDocument()
    expect(getByText('8')).toBeInTheDocument()
    expect(getByText('9')).toBeInTheDocument()
    expect(getByText('10')).toBeInTheDocument()
  })
})
