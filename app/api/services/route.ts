import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Service from "@/lib/models/Service";
import { SERVICES } from "@/components/types";

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    if (await Service.countDocuments() === 0) {
      try {
        await Service.insertMany(SERVICES.map((service, order) => ({ ...service, order })));
      } catch (error) {
        if ((error as { code?: number }).code !== 11000) throw error;
      }
    }
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json({ error: "Failed to fetch services." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();
    const service = await Service.create({
      code: String(body.code ?? "").trim().toUpperCase(),
      name: body.name,
      tagline: body.tagline,
      statValue: body.statValue,
      statLabel: body.statLabel,
      colorClass: body.colorClass,
      order: await Service.countDocuments(),
    });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "That service code is already in use." }, { status: 409 });
    }
    console.error("Failed to create service:", error);
    return NextResponse.json({ error: "Failed to create service." }, { status: 400 });
  }
}