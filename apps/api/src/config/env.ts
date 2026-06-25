const env = {
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/water_delivery",
  REDIS_URL: process.env.REDIS_URL || "redis://redis:6379",
  JWT_SECRET: process.env.JWT_SECRET || "change-me-to-a-secure-random-string",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  API_PORT: parseInt(process.env.API_PORT || "3001", 10),
  API_CORS_ORIGIN: process.env.API_CORS_ORIGIN || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

export default env;