import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
