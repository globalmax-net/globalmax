import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

const dummyPasswordHash = bcrypt.hash("not-a-real-admin-password", 12);
const maxFailedAttempts = 5;
const lockDurationMs = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || email.length > 254 || !password || password.length > 1024) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email }).select(
    "+password +failedLoginAttempts +lockUntil"
  );
  const passwordMatches = user
    ? await user.comparePassword(password)
    : await bcrypt.compare(password, await dummyPasswordHash);
  const now = new Date();
  const isLocked = Boolean(user?.lockUntil && user.lockUntil > now);

  if (!user || !passwordMatches || isLocked) {
    if (user && !isLocked && !passwordMatches) {
      if (user.lockUntil && user.lockUntil <= now) {
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
      }
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= maxFailedAttempts) {
        user.lockUntil = new Date(now.getTime() + lockDurationMs);
      }
      await user.save();
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not configured");
    return NextResponse.json({ error: "Unable to sign in right now" }, { status: 500 });
  }

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role, sessionVersion: user.sessionVersion },
    secret,
    { expiresIn: "12h" }
  );

  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}