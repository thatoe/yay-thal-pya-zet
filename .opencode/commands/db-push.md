---
description: Push Drizzle schema changes directly to the database (dev mode, no migration file)
agent: build
---

Push Drizzle schema changes directly to the database. Use this during development to quickly sync schema changes without generating migration files.

```bash
docker compose exec api npx drizzle-kit push
```