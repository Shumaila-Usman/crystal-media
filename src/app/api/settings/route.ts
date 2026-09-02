import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return NextResponse.json(serialize(settings));
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    const body = await request.json();
    await connectDB();

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json(serialize(settings.toObject()));
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
