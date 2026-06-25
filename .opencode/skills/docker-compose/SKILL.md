---
name: docker-compose
description: Use when managing Docker services — starting, stopping, rebuilding, viewing logs, running migrations, or debugging containers for the water delivery project.
---

# Docker Compose Operations

## Service Overview

| Service | Container Name | Image/Build | Port |
|---|---|---|---|
| postgres | water-delivery-db | postgres:16-alpine | 5432 |
| redis | water-delivery-redis | redis:7-alpine | 6379 |
| pgadmin | water-delivery-pgadmin | dpage/pgadmin4:latest | 5050 |
| api | water-delivery-api | ./apps/api/Dockerfile | 3001 |
| web | water-delivery-web | ./apps/web/Dockerfile | 3000 |

## Common Operations

### Start all services (with rebuild)
```bash
docker compose up --build
```

### Start in background
```bash
docker compose up -d --build
```

### Stop all services
```bash
docker compose down
```

### Stop and remove volumes (fresh start)
```bash
docker compose down -v
```

### Rebuild a single service
```bash
docker compose up --build -d api
docker compose up --build -d web
```

### View logs
```bash
docker compose logs api -f      # API logs
docker compose logs web -f      # Web logs
docker compose logs postgres -f  # DB logs
docker compose logs redis -f    # Redis logs
```

### Shell into a container
```bash
docker compose exec api sh
docker compose exec web sh
docker compose exec postgres psql -U postgres -d water_delivery
```

## Database Migrations

### Generate migration from schema changes
```bash
docker compose exec api npx drizzle-kit generate
```

### Run migrations
```bash
docker compose exec api npx drizzle-kit migrate
```

### Push schema directly (dev only — no migration file)
```bash
docker compose exec api npx drizzle-kit push
```

### Open Drizzle Studio (DB GUI)
```bash
docker compose exec api npx drizzle-kit studio
```

## pgAdmin Access

- URL: http://localhost:5050
- Email: admin@waterdelivery.com
- Password: admin
- When adding a server, use host: `postgres`, port: `5432`, user: `postgres`, password: `postgres`

## Health Checks

All infrastructure services have health checks. The api service waits for postgres and redis to be healthy before starting.

## Troubleshooting

### Port already in use
```bash
lsof -i :3000  # Check what's using port 3000
lsof -i :3001  # Check what's using port 3001
```

### Container won't start
```bash
docker compose logs <service-name> --tail 50
```

### Reset everything
```bash
docker compose down -v --rmi all
docker compose up --build
```