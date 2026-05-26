# ARCHITECTURE.md

High-level overview of the system design and component responsibilities.

## System Diagram

```
┌─────────────────────────────────────────────────────┐
│                     Client                          │
│              React + TypeScript (SPA)               │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS / REST + JSON
┌──────────────────────▼──────────────────────────────┐
│                   API Server                        │
│             Node.js + Express + TypeScript          │
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │   Routers   │→ │   Services   │→ │   Repos   │  │
│  └─────────────┘  └──────────────┘  └─────┬─────┘  │
└────────────────────────────────────────────┼────────┘
                                             │
              ┌──────────────────────────────┼──────┐
              │                             │       │
     ┌────────▼────────┐          ┌─────────▼─────┐ │
     │   PostgreSQL    │          │     Redis      │ │
     │  (primary data) │          │  (cache/queue) │ │
     └─────────────────┘          └───────────────┘ │
              └──────────────────────────────────────┘
```

## Directory Structure

```
.
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Global state (Zustand)
│   │   ├── services/        # API client functions
│   │   └── utils/           # Pure helper functions
│   └── public/
│
├── server/                  # Express backend
│   ├── src/
│   │   ├── routes/          # Express routers (thin — validation only)
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Database access layer
│   │   ├── middleware/       # Auth, error handling, logging
│   │   └── db/              # Migrations & schema
│   └── tests/
│
├── shared/                  # Types/constants shared by client & server
└── infra/                   # Docker, CI configs
```

## Key Design Decisions

### 1. Layered Backend (Routes → Services → Repositories)

Routes handle HTTP concerns (parsing, validation) and delegate immediately to service functions. Services contain all business logic and are framework-agnostic. Repositories encapsulate all SQL and can be swapped for a different DB client without touching service code.

### 2. JWT Authentication

Stateless auth using short-lived access tokens (15 min) and long-lived refresh tokens (7 days) stored in HTTP-only cookies. Token refresh is handled transparently by an Axios interceptor on the client.

### 3. Redis for Caching & Background Jobs

Frequently read, rarely changed data (e.g., user profile, config) is cached in Redis with a TTL. Background jobs (emails, notifications) are queued via BullMQ and processed by a lightweight worker process.

### 4. Shared Types Package

The `shared/` directory exports TypeScript types for API request/response shapes. Both `client/` and `server/` import from it, ensuring the contract stays in sync at compile time.

## Data Flow — Typical Request

```
1. User action in React component
2. Component calls service function (services/api.ts)
3. Axios sends request with JWT Bearer token
4. Express router validates request (zod schema)
5. Service layer applies business rules
6. Repository executes parameterized SQL
7. Result mapped to DTO and returned as JSON
8. React Query caches response; component re-renders
```

## Infrastructure

| Concern        | Tool / Service          |
|---------------|-------------------------|
| Hosting        | Docker + fly.io         |
| CI/CD          | GitHub Actions          |
| DB Migrations  | node-pg-migrate         |
| Monitoring     | Sentry (errors) + Pino (logs) |
| Secrets        | Environment variables via `.env` |
