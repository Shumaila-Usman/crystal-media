import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, isValidObjectId, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Brand } from "@/models/Brand";
import { deleteImage } from "@/lib/cloudinary";

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
    const brand = await Brand.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!brand) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(serialize(brand));
  } catch (error) {
    console.error("Brand PUT error:", error);
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
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
    const brand = await Brand.findById(id);
    if (!brand) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (brand.logoPublicId) {
      await deleteImage(brand.logoPublicId).catch(() => {});
    }

    await brand.deleteOne();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Brand DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}
