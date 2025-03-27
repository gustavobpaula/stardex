import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    total: 100,
    currentPage: 1,
    onNextPage: () => {},
    onPreviousPage: () => {},
    onPage: () => {},
  },
}
