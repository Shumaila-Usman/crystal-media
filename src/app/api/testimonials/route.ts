import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ sortOrder: 1 }).lean();
    return NextResponse.json(serialize(testimonials));
  } catch (error) {
    console.error("Testimonials GET error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
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
    const testimonial = await Testimonial.create(body);
    return NextResponse.json(serialize(testimonial), { status: 201 });
  } catch (error) {
    console.error("Testimonials POST error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
