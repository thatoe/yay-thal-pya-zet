import type { Context, Next } from "hono";
import { verify } from "jsonwebtoken";
import env from "../config/env.js";
import type { JwtPayload } from "@water-delivery/shared";

export const authMiddleware = async (c: Context, next: Next) => {
  const header = c.req.header("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return c.json({ success: false, error: "Unauthorized" }, 401);
  }

  const token = header.slice(7);
  try {
    const payload = verify(token, env.JWT_SECRET) as JwtPayload;
    c.set("user", payload);
    await next();
  } catch {
    return c.json({ success: false, error: "Invalid or expired token" }, 401);
  }
};

export const requireRole = (...roles: string[]) => {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as JwtPayload | undefined;
    if (!user || !roles.includes(user.role)) {
      return c.json({ success: false, error: "Forbidden" }, 403);
    }
    await next();
  };
};