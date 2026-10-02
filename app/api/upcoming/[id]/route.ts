import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import UpcomingPlatform from "@/lib/models/UpcomingPlatform";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const platform = await UpcomingPlatform.findByIdAndUpdate(
      id,
      { name: body.name, description: body.description },
      { new: true, runValidators: true }
    );
    if (!platform) {
      return NextResponse.json({ error: "Upcoming platform not found." }, { status: 404 });
    }
    return NextResponse.json(platform);
  } catch (error) {
    console.error("Failed to update upcoming platform:", error);
    return NextResponse.json({ error: "Failed to update upcoming platform." }, { status: 400 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const platform = await UpcomingPlatform.findByIdAndDelete(id);
    if (!platform) {
      return NextResponse.json({ error: "Upcoming platform not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete upcoming platform:", error);
    return NextResponse.json({ error: "Failed to delete upcoming platform." }, { status: 500 });
  }
}