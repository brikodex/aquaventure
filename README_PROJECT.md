# Next.js + Tailwind CSS + shadcn/ui + TypeScript

A modern starter template combining Next.js, Tailwind CSS, shadcn/ui components, and TypeScript for building high-performance web applications.

## Features

- **Next.js 16** - React framework for production-grade apps
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Radix UI based component library
- **Prisma** - Modern ORM for database management
- **React Query** - Server state management
- **React Hook Form** - Performant forms with Zod validation
- **Framer Motion** - Animation library
- **Next Auth** - Authentication solution
- **Multiple Radix UI components** - Accordion, Dialog, Select, Dropdown, etc.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
# or
yarn install --ignore-scripts
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```

3. Set up the database:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema changes
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Create database migration
- `npm run db:reset` - Reset database

## Project Structure

```
├── app/              # Next.js app directory
├── styles/           # Global styles
├── components/       # Reusable components
├── lib/              # Utility functions
├── prisma/           # Database schema
└── public/           # Static assets
```

## Technologies

See [package.json](package.json) for a complete list of dependencies.

## License

MIT
