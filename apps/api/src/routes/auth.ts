import { Hono } from "hono";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db, users } from "@water-delivery/db";
import env from "../config/env.js";
import { authMiddleware } from "../middleware/auth.js";
import type { JwtPayload, RegisterRequest, LoginRequest } from "@water-delivery/shared";

export const authRoutes = new Hono();

authRoutes.post("/register", async (c) => {
  const body = await c.req.json<RegisterRequest>();

  if (!body.email || !body.password || !body.name) {
    return c.json({ success: false, error: "email, password, and name are required" }, 400);
  }

  const existing = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
  if (existing.length > 0) {
    return c.json({ success: false, error: "Email already registered" }, 409);
  }

  const passwordHash = await hash(body.password, 12);
  const [newUser] = await db
    .insert(users)
    .values({
      email: body.email,
      passwordHash,
      name: body.name,
      phone: body.phone || null,
    })
    .returning();

  const payload: JwtPayload = {
    sub: newUser.id,
    email: newUser.email,
    role: newUser.role,
  };

  const token = sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

  return c.status(201).json({
    success: true,
    data: {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
      },
      token,
    },
  });
});

authRoutes.post("/login", async (c) => {
  const body = await c.req.json<LoginRequest>();

  if (!body.email || !body.password) {
    return c.json({ success: false, error: "email and password are required" }, 400);
  }

  const result = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
  const user = result[0];

  if (!user) {
    return c.json({ success: false, error: "Invalid credentials" }, 401);
  }

  const valid = await compare(body.password, user.passwordHash);
  if (!valid) {
    return c.json({ success: false, error: "Invalid credentials" }, 401);
  }

  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const token = sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

  return c.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
      },
      token,
    },
  });
});

authRoutes.get("/me", authMiddleware, async (c) => {
  const currentUser = c.get("user") as JwtPayload;

  const result = await db.select().from(users).where(eq(users.id, currentUser.sub)).limit(1);
  const user = result[0];

  if (!user) {
    return c.json({ success: false, error: "User not found" }, 404);
  }

  return c.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
    },
  });
});