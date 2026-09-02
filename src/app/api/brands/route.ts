import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Brand } from "@/models/Brand";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    const brands = await Brand.find().sort({ sortOrder: 1 }).lean();
    return NextResponse.json(serialize(brands));
  } catch (error) {
    console.error("Brands GET error:", error);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
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
    const brand = await Brand.create(body);
    return NextResponse.json(serialize(brand), { status: 201 });
  } catch (error) {
    console.error("Brands POST error:", error);
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}
