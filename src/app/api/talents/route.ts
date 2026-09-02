import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Talent } from "@/models/Talent";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    const search = request.nextUrl.searchParams.get("search");
    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { niche: new RegExp(search, "i") },
        { city: new RegExp(search, "i") },
      ];
    }

    const talents = await Talent.find(query)
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    return NextResponse.json(serialize(talents));
  } catch (error) {
    console.error("Talents GET error:", error);
    return NextResponse.json({ error: "Failed to fetch talents" }, { status: 500 });
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

    const existing = await Talent.findOne({ slug: body.slug });
    if (existing) {
      body.slug = `${body.slug}-${Date.now()}`;
    }

    const talent = await Talent.create(body);
    return NextResponse.json(serialize(talent), { status: 201 });
  } catch (error) {
    console.error("Talents POST error:", error);
    return NextResponse.json({ error: "Failed to create talent" }, { status: 500 });
  }
}
