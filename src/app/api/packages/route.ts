import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Package } from "@/models/Package";
import { slugify } from "@/lib/utils";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    const packages = await Package.find().sort({ sortOrder: 1 }).lean();
    return NextResponse.json(serialize(packages));
  } catch (error) {
    console.error("Packages GET error:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
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

    if (!body.slug && body.name) {
      body.slug = slugify(body.name);
    }

    const pkg = await Package.create(body);
    return NextResponse.json(serialize(pkg), { status: 201 });
  } catch (error) {
    console.error("Packages POST error:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}
