import type { Meta, StoryObj } from '@storybook/react'
import Layout from './layout'

const meta = {
  title: 'Template/layout',
  component: Layout,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <main className="flex justify-center p-8">Hello World</main>,
  },
}
