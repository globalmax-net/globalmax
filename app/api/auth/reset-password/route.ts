import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

const minimumPasswordLength = 12;
const maximumPasswordLength = 128;

export async function POST(req: NextRequest) {
  let body: { token?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!/^[a-f0-9]{64}$/.test(token)) {
    return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
  }
  if (password.length < minimumPasswordLength || password.length > maximumPasswordLength) {
    return NextResponse.json(
      { error: "Use a password between 12 and 128 characters." },
      { status: 400 }
    );
  }

  await connectDB();
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpires: { $gt: new Date() },
  }).select(
    "+password +passwordResetTokenHash +passwordResetExpires +passwordResetRequestedAt +failedLoginAttempts +lockUntil"
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
  }

  user.password = password;
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetRequestedAt = undefined;
  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  user.sessionVersion += 1;
  await user.save();

  const response = NextResponse.json({ message: "Password updated. Sign in with your new password." });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
