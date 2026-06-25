---
description: Run Drizzle ORM database migrations
agent: build
---

Run the Drizzle Kit migrate command inside the API container to apply pending database migrations.

```bash
docker compose exec api npx drizzle-kit migrate
```