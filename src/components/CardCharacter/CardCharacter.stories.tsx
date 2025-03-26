import type { Meta, StoryObj } from '@storybook/react'
import { CardCharacter } from './CardCharacter'

const meta = {
  title: 'Components/CardCharacter',
  component: CardCharacter,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CardCharacter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    birthYear: '19BBY',
    height: '172',
    name: 'Luke Skywalker',
    homeworld: {
      name: 'Tatooine',
      url: 'https://swapi.dev/api/planets/1/',
    },
    url: 'https://swapi.dev/api/people/1/',
  },
}
