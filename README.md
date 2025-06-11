# TriCore Information Technology Solutions Website

A modern, futuristic website for TriCore Information Technology Solutions built with Next.js, TypeScript, TailwindCSS, Framer Motion, and Three.js.

## Features

- Responsive, futuristic design with glass morphism effects
- Interactive animations and transitions using Framer Motion
- 3D particle background using Three.js
- Dark mode optimized interface with glowing accents
- Mobile-friendly navigation and layout

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **3D Effects**: Three.js / React Three Fiber
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/tricoreweb.git
   cd tricoreweb
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable UI components
  - `layout`: Layout components (Navbar, Footer)
  - `sections`: Page section components (Hero, Services, etc.)
  - `ui`: UI components (Logo, buttons, etc.)
  - `animations`: Animation components and utilities

## Customization

- Colors and theme variables are defined in `src/app/globals.css`
- Tailwind configuration is in `tailwind.config.js`

## Deployment

The easiest way to deploy the application is through Vercel:

1. Push your code to a GitHub repository
2. Import your project into Vercel
3. Vercel will detect Next.js and set up the build configuration automatically

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Built with Next.js
- Designed for TriCore Information Technology Solutions
