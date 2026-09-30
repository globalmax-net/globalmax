import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getSession() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload as { id: string; role: "admin" };
  } catch {
    return null;
  }
}