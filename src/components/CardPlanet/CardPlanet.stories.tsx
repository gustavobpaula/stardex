import type { Meta, StoryObj } from '@storybook/react'
import { CardPlanet } from './CardPlanet'

const meta = {
  title: 'Components/CardPlanet',
  component: CardPlanet,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CardPlanet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Tatooine',
    climate: 'Arid',
    orbitalPeriod: '304',
    rotationPeriod: '23',
    residents: [
      { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      { name: 'C-3PO', url: 'https://swapi.dev/api/people/2/' },
    ],
    url: 'https://swapi.dev/api/planets/1/',
  },
}
