import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function getSession() {
  const token = (await cookies()).get("token")?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;
  let payload;
  try {
    ({ payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    ));
  } catch {
    return null;
  }
  if (
    typeof payload.id !== "string" ||
    payload.role !== "admin" ||
    typeof payload.sessionVersion !== "number"
  ) {
    return null;
  }
  await connectDB();
  const user = await User.findById(payload.id).select("sessionVersion");
  if (!user || user.sessionVersion !== payload.sessionVersion) return null;
  return { id: payload.id, role: "admin" as const };
}