# Water Delivery System

Fresh water delivered to your door — a full-stack water delivery platform with landing page, REST API, real-time WebSocket support, and mobile app readiness.

## Tech Stack

| Layer     | Technology                                |
| --------- | ----------------------------------------- |
| Frontend  | Next.js 15 + DaisyUI v5 + Tailwind CSS v4 |
| Backend   | Hono v4 + @hono/node-server               |
| ORM       | Drizzle ORM                               |
| Database  | PostgreSQL 16                             |
| Cache     | Redis 7                                   |
| Real-time | Socket.IO v4                              |
| Auth      | JWT + bcryptjs                            |
| Runtime   | Node.js 22                                |
| Monorepo  | npm workspaces                            |

## Project Structure

```
water-delivery/
├── apps/
│   ├── api/                    # Hono API server (port 3001)
│   │   └── src/
│   │       ├── index.ts        # Entry: Hono + Socket.IO + HTTP
│   │       ├── config/env.ts   # Environment variables
│   │       ├── routes/         # auth.ts, health.ts
│   │       ├── middleware/     # auth.ts, error.ts
│   │       └── ws/index.ts    # Socket.IO handlers
│   └── web/                    # Next.js landing page (port 3000)
│       └── src/
│           ├── app/            # App Router pages
│           └── components/     # Navbar, Footer
├── packages/
│   ├── db/                     # Drizzle ORM schema + connection
│   └── shared/                 # Shared types & constants
├── docker/postgres/init.sql    # DB init script
├── .devcontainer/              # VS Code devcontainer setup
├── docker-compose.yml          # Full stack orchestration
├── opencode.json               # OpenCode MCP + permissions
└── package.json                # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 22+
- Docker & Docker Compose
- npm 10+

### Quick Start (Docker)

```bash
# Clone the repo
git clone <repo-url>
cd water-delivery

# Copy environment variables
cp .env.example .env

# Start all services
npm run dev
```

This starts 5 containers:

| Service  | URL                          | Description             |
| -------- | ---------------------------- | ----------------------- |
| Web      | http://localhost:3000         | Next.js landing page    |
| API      | http://localhost:3001         | Hono REST API           |
| Postgres | localhost:5432               | PostgreSQL database     |
| Redis    | localhost:6379               | Redis cache             |
| pgAdmin  | http://localhost:5050         | Database admin UI       |

pgAdmin login: `admin@waterdelivery.com` / `admin`

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start only infrastructure (Postgres + Redis)
docker compose up postgres redis -d

# Start API (port 3001)
npm run dev:api

# Start Web (port 3000)
npm run dev:web
```

## Available Scripts

### Root

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start all Docker services            |
| `npm run dev:api` | Start API server only                |
| `npm run dev:web` | Start web app only                   |
| `npm run build`   | Build all packages in order          |
| `npm run lint`    | Lint all workspaces                  |
| `npm run format`  | Format with Prettier                 |

### Database

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `npm run db:generate` | Generate Drizzle migrations       |
| `npm run db:migrate`  | Run migrations                   |
| `npm run db:push`     | Push schema changes (dev only)   |
| `npm run db:studio`   | Open Drizzle Studio              |

## API Endpoints

### Health

| Method | Path     | Description       | Auth |
| ------ | -------- | ----------------- | ---- |
| GET    | `/health` | Health check     | No   |

### Auth

| Method | Path            | Description              | Auth     |
| ------ | --------------- | ------------------------ | -------- |
| POST   | `/auth/register` | Register new user       | No       |
| POST   | `/auth/login`    | Login, returns JWT      | No       |
| GET    | `/auth/me`       | Get current user        | Bearer   |

## Frontend Pages

| Route            | Page           | Description                              |
| ---------------- | -------------- | ---------------------------------------- |
| `/`              | Home           | Hero section + "Why Choose Us"           |
| `/products`      | Products       | 6 water products (Purified/Mineral/etc.) |
| `/subscription`  | Subscription   | 3 plans: Basic, Standard, Premium        |
| `/pricing`       | Pricing        | Add-ons + Enterprise plan                |
| `/about`         | About          | Mission, stats, values                   |
| `/contact`       | Contact        | Contact form + info                      |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# API
API_PORT=3001
API_CORS_ORIGIN=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## DevContainer

Open the project in VS Code with the Dev Containers extension. The `.devcontainer/` config sets up:

- Node.js 22 with git, curl, postgresql-client, redis-tools
- Auto-installs dependencies on create
- Forwards ports: 3000, 3001, 5432, 6379, 5050
- Docker-in-Docker and GitHub CLI support

Required VS Code extensions: ESLint, Prettier, Tailwind CSS, Docker, PostgreSQL, TypeScript.

## Project Conventions

- **TypeScript strict mode** — no `any`, explicit return types
- **ESM** — all packages use `"type": "module"`, `.js` extensions in imports
- **Named exports** preferred over default exports (except Next.js pages)
- **API responses** follow `{ success: boolean, data?: T, error?: string }`
- **Import aliases**: `@water-delivery/db`, `@water-delivery/shared`, `@/`

## Roadmap

### Frontend — Landing Page (SPA)

- [x] Home page with hero section and "Why Choose Us"
- [x] Products page — 6 water products with details and pricing
- [x] Subscription page — 3 plans (Basic, Standard, Premium)
- [x] Pricing page — add-ons table and enterprise CTA
- [x] About page — mission, stats, company values
- [x] Contact page — contact form with client-side state
- [x] Navbar — sticky header with mobile responsive dropdown
- [x] Footer — 4-column layout with links
- [x] DaisyUI theming (`data-theme="water"`)
- [x] Tailwind CSS v4 responsive design

### Backend API

- [ ] Product CRUD endpoints (list, get, create, update, delete)
- [ ] Subscription plan endpoints
- [ ] Order management (create, list, status updates)
- [ ] Customer profile management
- [ ] Driver assignment and tracking
- [ ] Payment integration
- [ ] Rate limiting and request validation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Email notification service
- [ ] Admin dashboard endpoints

### Mobile App (Flutter)

- [ ] Project setup with Flutter + Dart
- [ ] Authentication screens (login, register, forgot password)
- [ ] Home screen with product catalog
- [ ] Product detail screen
- [ ] Subscription plan selection
- [ ] Order placement and tracking
- [ ] User profile and order history
- [ ] Push notifications
- [ ] Payment integration
- [ ] Driver app (route optimization, delivery confirmation)
- [ ] Offline support and caching

## License

Private
