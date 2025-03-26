import type { Meta, StoryObj } from '@storybook/react'
import { Empty } from './Empty'

const meta = {
  title: 'Components/Empty',
  component: Empty,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
