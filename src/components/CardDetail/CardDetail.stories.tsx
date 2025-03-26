import type { Meta, StoryObj } from '@storybook/react'
import { CardDetail } from './CardDetail'
import { Eye, Users } from 'lucide-react'

const meta = {
  title: 'Components/CardDetail',
  component: CardDetail,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CardDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Luke Skywalker',
    description: 'some description',
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
  },
}
