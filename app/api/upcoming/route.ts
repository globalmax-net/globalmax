import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import UpcomingPlatform from "@/lib/models/UpcomingPlatform";
import { UPCOMING } from "@/components/types";

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    if (await UpcomingPlatform.countDocuments() === 0) {
      try {
        await UpcomingPlatform.insertMany(UPCOMING.map((platform, order) => ({ ...platform, order })));
      } catch (error) {
        if ((error as { code?: number }).code !== 11000) throw error;
      }
    }
    const platforms = await UpcomingPlatform.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json(platforms);
  } catch (error) {
    console.error("Failed to fetch upcoming platforms:", error);
    return NextResponse.json({ error: "Failed to fetch upcoming platforms." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const platform = await UpcomingPlatform.create({
      name: body.name,
      description: body.description,
      order: await UpcomingPlatform.countDocuments(),
    });
    return NextResponse.json(platform, { status: 201 });
  } catch (error) {
    console.error("Failed to create upcoming platform:", error);
    return NextResponse.json({ error: "Failed to create upcoming platform." }, { status: 400 });
  }
}