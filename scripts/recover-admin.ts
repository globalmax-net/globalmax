import { randomInt } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { loadEnvConfig } from "@next/env";
import { isValidEmailAddress } from "@/lib/email";

loadEnvConfig(process.cwd());

const minimumPasswordLength = 8;
const maximumPasswordLength = 128;
const verificationCodeLifetimeMs = 5 * 60 * 1000;
const maximumVerificationAttempts = 5;

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!process.env.MONGODB_URI || !apiKey || !from) {
    throw new Error("Set MONGODB_URI, RESEND_API_KEY and RESEND_FROM_EMAIL before continuing.");
  }
  if (!isValidEmailAddress(email)) {
    throw new Error("ADMIN_EMAIL must be a correctly formatted email address.");
  }
  if (password.length < minimumPasswordLength || password.length > maximumPasswordLength) {
    throw new Error("Set ADMIN_PASSWORD to a password between 8 and 128 characters.");
  }

  const [{ default: User }, { connectDB }, { default: mongoose }] = await Promise.all([
    import("@/lib/models/User"),
    import("@/lib/db"),
    import("mongoose"),
  ]);

  const verificationCode = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = Date.now() + verificationCodeLifetimeMs;

  try {
    await connectDB();
    const admins = await User.find({ role: "admin" })
      .select("+failedLoginAttempts +lockUntil +passwordResetTokenHash +passwordResetExpires +passwordResetRequestedAt")
      .limit(2);
    if (admins.length !== 1) {
      throw new Error(
        `Expected exactly one admin account in the configured database; found ${admins.length}.`
      );
    }

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
          to: [email],
          subject: "Verify your Global Max admin recovery email",
          text: `Your one-time admin recovery code is ${verificationCode}. It expires in 5 minutes. If you did not request this, ignore this email.`,
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      throw new Error("Unable to reach the email provider. Check your network and try again.");
    }

    if (!response.ok) {
      throw new Error(`The email provider rejected the verification email (status ${response.status}).`);
    }

    const readline = createInterface({ input: stdin, output: stdout });
    try {
      for (let attempt = 1; attempt <= maximumVerificationAttempts; attempt += 1) {
        if (Date.now() >= expiresAt) {
          throw new Error("The verification code expired. Run the recovery command again.");
        }

        const enteredCode = (
          await readline.question(`Enter the 6-digit code sent to ${email}: `)
        ).trim();
        if (Date.now() >= expiresAt) {
          throw new Error("The verification code expired. Run the recovery command again.");
        }
        if (enteredCode === verificationCode) break;
        if (attempt === maximumVerificationAttempts) {
          throw new Error("Too many incorrect codes. Run the recovery command again.");
        }
        console.error("That code is incorrect. Please try again.");
      }
    } finally {
      readline.close();
    }

    const admin = admins[0];
    admin.email = email;
    admin.password = password;
    admin.failedLoginAttempts = 0;
    admin.lockUntil = undefined;
    admin.sessionVersion += 1;
    admin.passwordResetTokenHash = undefined;
    admin.passwordResetExpires = undefined;
    admin.passwordResetRequestedAt = undefined;
    await admin.save();

    console.log("Email verified. The admin email and password have been updated.");
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
