import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import SuccessStat from "@/lib/models/SuccessStat";

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
    const value = String(body.value ?? "").trim();
    const label = String(body.label ?? "").trim();

    if (!value || !label) {
      return NextResponse.json({ error: "Value and label are required." }, { status: 400 });
    }

    const stat = await SuccessStat.findByIdAndUpdate(
      id,
      { value, label },
      { new: true, runValidators: true }
    );

    if (!stat) {
      return NextResponse.json({ error: "Success stat not found." }, { status: 404 });
    }

    return NextResponse.json(stat);
  } catch (error) {
    console.error("Failed to update success stat:", error);
    return NextResponse.json({ error: "Failed to update success stat." }, { status: 400 });
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
    const stat = await SuccessStat.findByIdAndDelete(id);
    if (!stat) {
      return NextResponse.json({ error: "Success stat not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete success stat:", error);
    return NextResponse.json({ error: "Failed to delete success stat." }, { status: 500 });
  }
}
