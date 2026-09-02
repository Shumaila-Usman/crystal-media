import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, isValidObjectId, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Talent } from "@/models/Talent";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectDB();
    const talent = await Talent.findById(id).lean();
    if (!talent) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(serialize(talent));
  } catch (error) {
    console.error("Talent GET error:", error);
    return NextResponse.json({ error: "Failed to fetch talent" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    await connectDB();

    const talent = await Talent.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!talent) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(serialize(talent));
  } catch (error) {
    console.error("Talent PUT error:", error);
    return NextResponse.json({ error: "Failed to update talent" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await connectDB();
    const talent = await Talent.findById(id);
    if (!talent) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (talent.imagePublicId) {
      await deleteImage(talent.imagePublicId).catch(() => {});
    }

    await talent.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Talent DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete talent" }, { status: 500 });
  }
}
