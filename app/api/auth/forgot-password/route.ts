import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { isValidEmailAddress } from "@/lib/email";
import User from "@/lib/models/User";

const resetTokenLifetimeMs = 15 * 60 * 1000;
const resetRequestCooldownMs = 60 * 1000;
const genericMessage =
  "If an admin account matches, a reset link will be sent. If it doesn't arrive shortly, contact the site administrator.";

function getAppUrl() {
  const configuredUrl = process.env.APP_URL;
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    if (
      (process.env.NODE_ENV === "production" && url.protocol !== "https:") ||
      url.username ||
      url.password
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isValidEmailAddress(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const appUrl = getAppUrl();
  if (!apiKey || !from || !appUrl) {
    console.error("Password reset email is not configured; set APP_URL, RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return NextResponse.json(
      { error: "Password recovery is not configured yet. Contact the site administrator." },
      { status: 503 }
    );
  }

  await connectDB();
  const user = await User.findOne({ email }).select("+passwordResetRequestedAt");
  if (!user) return NextResponse.json({ message: genericMessage });

  const now = new Date();
  if (
    user.passwordResetRequestedAt &&
    now.getTime() - user.passwordResetRequestedAt.getTime() < resetRequestCooldownMs
  ) {
    return NextResponse.json({ message: genericMessage });
  }

  const token = randomBytes(32).toString("hex");
  user.passwordResetTokenHash = createHash("sha256").update(token).digest("hex");
  user.passwordResetExpires = new Date(now.getTime() + resetTokenLifetimeMs);
  user.passwordResetRequestedAt = now;
  await user.save();

  const resetUrl = `${appUrl}/admin/reset-password?token=${token}`;
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [user.email],
        subject: "Reset your Global Max admin password",
        text: `A password reset was requested for your Global Max admin account. This link expires in 15 minutes:\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
        html: `<p>A password reset was requested for your Global Max admin account.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 15 minutes. If you did not request this, you can ignore this email.</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Unable to reach the password reset email provider.", error);
    await User.updateOne(
      { _id: user._id },
      { $unset: { passwordResetTokenHash: 1, passwordResetExpires: 1, passwordResetRequestedAt: 1 } }
    );
    return NextResponse.json({ message: genericMessage });
  }

  if (!response.ok) {
    console.error("Password reset email provider rejected a request.", {
      status: response.status,
    });
    await User.updateOne(
      { _id: user._id },
      { $unset: { passwordResetTokenHash: 1, passwordResetExpires: 1, passwordResetRequestedAt: 1 } }
    );
    return NextResponse.json({ message: genericMessage });
  }

  return NextResponse.json({ message: genericMessage });
}
