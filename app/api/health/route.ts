import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    await mongoose.connection.db!.admin().ping();
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("DB health check failed:", error);
    return NextResponse.json(
      { status: "error", database: "disconnected" },
      { status: 503 }
    );
  }
}