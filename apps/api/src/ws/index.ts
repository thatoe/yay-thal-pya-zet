import type { Server as SocketIOServer, Socket } from "socket.io";
import { verify } from "jsonwebtoken";
import env from "../config/env.js";
import type { JwtPayload } from "@water-delivery/shared";

export const setupSocketIO = (io: SocketIOServer) => {
  io.use(async (socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication required"));
    }

    try {
      const payload = verify(token, env.JWT_SECRET) as JwtPayload;
      socket.data.user = payload;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = socket.data.user as JwtPayload;
    console.log(`[Socket.IO] User ${user.email} connected (${socket.id})`);

    socket.join(`user:${user.sub}`);

    socket.on("disconnect", () => {
      console.log(`[Socket.IO] User ${user.email} disconnected (${socket.id})`);
    });
  });
};