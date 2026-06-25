---
name: water-delivery-stack
description: Use when working on the water delivery monorepo project. Covers project structure, tech stack conventions, coding patterns, and import/export rules for Hono, Next.js, Drizzle, DaisyUI, and Docker.
---

# Water Delivery Stack Guide

## Monorepo Structure

```
water-delivery/
├── apps/
│   ├── api/           # Hono API server (port 3001)
│   └── web/           # Next.js landing page (port 3000)
├── packages/
│   ├── db/            # Drizzle ORM schema, migrations, and DB connection
│   └── shared/        # Shared TypeScript types and constants
├── docker/
│   └── postgres/
│       └── init.sql   # PostgreSQL initialization
├── docker-compose.yml # All services (postgres, redis, pgadmin, api, web)
├── opencode.json      # OpenCode config with MCP servers
├── AGENTS.md          # Project conventions
└── package.json       # Root workspace config
```

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | Next.js + DaisyUI + Tailwind CSS v4 | 15.x |
| Backend | Hono + @hono/node-server | 4.x |
| ORM | Drizzle ORM + drizzle-kit | 0.39+ |
| Database | PostgreSQL | 16 |
| Cache/PubSub | Redis | 7 |
| Real-time | Socket.IO | 4.x |
| Auth | JWT (jsonwebtoken) + bcryptjs | — |
| Runtime | Node.js | 22 |

## Import Aliases

- `@water-delivery/db` → `packages/db/src`
- `@water-delivery/shared` → `packages/shared/src`
- `@/` → `apps/web/src/` (Next.js path alias)

## API Response Format

All API endpoints return:
```typescript
{ success: boolean; data?: T; error?: string; message?: string }
```

## Environment Variables

All env vars are in `.env`. Docker Compose reads `.env` automatically.
Never commit `.env` — use `.env.example` as a template.

## Docker Commands

```bash
docker compose up --build          # Start all services
docker compose up -d --build       # Start in background
docker compose down                # Stop all services
docker compose logs api -f         # Follow API logs
docker compose logs web -f         # Follow web logs
docker compose exec api sh         # Shell into API container
docker compose exec postgres psql -U postgres -d water_delivery  # DB shell
```

## Port Reference

| Service | Port |
|---|---|
| Web (Next.js) | 3000 |
| API (Hono) | 3001 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| pgAdmin | 5050 |