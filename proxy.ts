import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const secret = process.env.JWT_SECRET;
  const loginUrl = new URL("/admin/login", req.url);
  if (!token || !secret) return NextResponse.redirect(loginUrl);

  let payload;
  try {
    ({ payload } = await jwtVerify(token, new TextEncoder().encode(secret)));
  } catch {
    return NextResponse.redirect(loginUrl);
  }

  if (
    typeof payload.id !== "string" ||
    payload.role !== "admin" ||
    typeof payload.sessionVersion !== "number"
  ) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    await connectDB();
    const user = await User.findById(payload.id).select("sessionVersion");
    if (!user || user.sessionVersion !== payload.sessionVersion) {
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error("Unable to validate the admin session.", error);
    return NextResponse.json(
      { error: "Unable to validate the admin session right now." },
      { status: 503 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login|forgot-password|reset-password).*)"],
};
