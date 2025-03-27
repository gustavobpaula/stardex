import type { Meta, StoryObj } from '@storybook/react'
import { CardLoading } from './CardLoading'

const meta = {
  title: 'Components/CardLoading',
  component: CardLoading,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CardLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
