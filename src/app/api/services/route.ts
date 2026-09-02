import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import { slugify } from "@/lib/utils";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    const services = await Service.find().sort({ sortOrder: 1 }).lean();
    return NextResponse.json(serialize(services));
  } catch (error) {
    console.error("Services GET error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    const body = await request.json();
    await connectDB();

    if (!body.slug && body.title) {
      body.slug = slugify(body.title);
    }

    const service = await Service.create(body);
    return NextResponse.json(serialize(service), { status: 201 });
  } catch (error) {
    console.error("Services POST error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
