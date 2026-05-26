# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

A full-stack web application built with React (frontend) and Node.js/Express (backend), using PostgreSQL as the primary database.

## Common Commands

### Development
```bash
npm install        # Install dependencies
npm run dev        # Start development server (frontend + backend)
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Lint source files
```

### Database
```bash
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset and re-seed database
```

## Code Style & Conventions

- **Language**: TypeScript (strict mode enabled)
- **Formatting**: Prettier with default config; run `npm run format` before committing
- **Linting**: ESLint with `eslint-config-airbnb`
- **Naming**: camelCase for variables/functions, PascalCase for components/classes, UPPER_SNAKE_CASE for constants
- **Imports**: Absolute imports via `@/` alias (e.g., `import Button from '@/components/Button'`)

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a full breakdown of the system design.

## Testing

- Unit tests: Vitest (`*.test.ts`)
- Integration tests: Supertest for API routes
- E2E tests: Playwright (`tests/e2e/`)
- Run a single test: `npm test -- src/utils/format.test.ts`

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values before running locally.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — Secret for signing auth tokens
- `PORT` — Server port (default: `3000`)

## Pull Request Guidelines

1. Branch from `main`; prefix branches with `feat/`, `fix/`, or `chore/`
2. Keep PRs focused — one concern per PR
3. All tests must pass before merging
4. Request review from at least one other contributor
