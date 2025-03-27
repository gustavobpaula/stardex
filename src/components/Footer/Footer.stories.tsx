import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
