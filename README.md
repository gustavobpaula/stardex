# StarDex

StarDex is a web application that allows you to explore the Star Wars universe, providing detailed information about characters and planets.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Live Demo](#live-demo)

## Overview

StarDex is an application developed for Star Wars fans who want to explore and discover detailed information about characters and planets from the Star Wars universe. The application uses the SWAPI API to fetch up-to-date data.

## Features

- View list and detailed information about Star Wars characters.
- View list detailed information about Star Wars planets.
- Search for characters and planets by name.
- Favorite characters and planets.
- Intuitive and responsive navigation.

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/gustavobpaula/stardex.git
   ```

2. Navigate to the project directory:

   ```bash
   cd stardex
   ```

3. Install the dependencies:

   ```bash
   # if you not have pnpm run the command
   npx install pnpm -g
   ```

   ```bash
   # then run the command
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open your browser and go to `http://localhost:3000`.

## Usage

After starting the development server, you can navigate through the application to explore characters and planets from the Star Wars universe. Use the navigation bar to access different sections of the application.

## Project Structure

The project follows a well-organized structure to maintain scalability and readability. Here is an overview of the main directories and their purposes:

```plaintext

├── app/                 # Main Next.js directory (App Router)
│   ├── items/           # Items listing page (CSR)
│   ├── items/[id]/      # Item details page (SSR)
│   └── layout.tsx       # Global layout component
│
├── components/          # Reusable components
│   ├── ui/              # ShadCN-based UI components
│
├── entities/            # Types representing API data
│
├── hooks/               # Custom React hooks
│
├── mappers/             # Functions to map API data to the application's data models.
│
├── models/              # Types adapted for the UI
│
├── services/            # Contains the API service functions to fetch data from SWAPI.
│
├── store/               # Zustand store and store actions
│
└── utils/               # Helper functions

```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SWAPI](https://swapi.dev/)
- [Zustand](https://zustand.surge.sh/)
- [Shadcn/ui](https://ui.shadcn.com/)

## Live Demo

Check out the live demo of the application hosted on Vercel: [StarDex](https://stardex.vercel.app/)

---

Developed by [Gustavo Bento de Paula](https://github.com/gustavobpaula)
