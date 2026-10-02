import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Service from "@/lib/models/Service";

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
    const service = await Service.findByIdAndUpdate(
      id,
      {
        code: String(body.code ?? "").trim().toUpperCase(),
        name: body.name,
        tagline: body.tagline,
        statValue: body.statValue,
        statLabel: body.statLabel,
        colorClass: body.colorClass,
      },
      { new: true, runValidators: true }
    );
    if (!service) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "That service code is already in use." }, { status: 409 });
    }
    console.error("Failed to update service:", error);
    return NextResponse.json({ error: "Failed to update service." }, { status: 400 });
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
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return NextResponse.json({ error: "Failed to delete service." }, { status: 500 });
  }
}