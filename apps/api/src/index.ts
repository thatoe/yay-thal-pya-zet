import { createServer } from "node:http";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Server as SocketIOServer } from "socket.io";
import env from "./config/env.js";
import { healthRoutes } from "./routes/health.js";
import { authRoutes } from "./routes/auth.js";
import { errorHandler } from "./middleware/error.js";
import { setupSocketIO } from "./ws/index.js";

const app = new Hono();

app.use("*", logger());
app.use("*", cors({ origin: env.API_CORS_ORIGIN, credentials: true }));

app.route("/health", healthRoutes);
app.route("/auth", authRoutes);

app.onError(errorHandler);

const server = serve({ fetch: app.fetch, port: env.API_PORT });
const httpServer = createServer(server);

const io = new SocketIOServer(httpServer, {
  cors: { origin: env.API_CORS_ORIGIN, credentials: true },
});

setupSocketIO(io);

httpServer.listen(env.API_PORT, () => {
  console.log(`API server running on port ${env.API_PORT}`);
  console.log(`Socket.IO server ready`);
});

export { app, io };