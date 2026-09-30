import dns from "node:dns";
import mongoose from "mongoose";

// Fixes "querySrv ECONNREFUSED" when your network DNS can't resolve SRV records
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env.local");

// Cache the connection across hot reloads in dev
const g = globalThis as unknown as {
  _mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};
const cached = (g._mongoose ??= { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) return cached.conn;
  try {
    cached.promise ??= mongoose.connect(MONGODB_URI, { bufferCommands: false });
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // allow a retry on the next request
    throw error;
  }
  return cached.conn;
}