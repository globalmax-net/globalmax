import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import SuccessStat from "@/lib/models/SuccessStat";
import { DEFAULT_SUCCESS_STATS } from "@/lib/success";

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    if ((await SuccessStat.countDocuments()) === 0) {
      await SuccessStat.insertMany(
        DEFAULT_SUCCESS_STATS.map((stat, order) => ({ ...stat, order }))
      );
    }

    const stats = await SuccessStat.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to fetch success stats:", error);
    return NextResponse.json({ error: "Failed to fetch success stats." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const value = String(body.value ?? "").trim();
    const label = String(body.label ?? "").trim();

    if (!value || !label) {
      return NextResponse.json({ error: "Value and label are required." }, { status: 400 });
    }

    const stat = await SuccessStat.create({
      value,
      label,
      order: await SuccessStat.countDocuments(),
    });

    return NextResponse.json(stat, { status: 201 });
  } catch (error) {
    console.error("Failed to create success stat:", error);
    return NextResponse.json({ error: "Failed to create success stat." }, { status: 400 });
  }
}
