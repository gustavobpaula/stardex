import React from 'react'
import '../src/app/globals.css'
import type { Decorator, Preview } from '@storybook/react'

const withDarkMode: Decorator = (Story) => {
  // Adiciona a classe 'dark' ao body
  document.body.classList.add('dark')

  return <Story />
}

export const decorators = [withDarkMode]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators,
}

export default preview
