import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/water_delivery";

const client = postgres(connectionString);
export const db = drizzle(client, { schema });