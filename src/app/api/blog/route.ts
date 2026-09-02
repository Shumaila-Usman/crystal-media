import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { slugify, calculateReadingTime } from "@/lib/utils";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(serialize(posts));
  } catch (error) {
    console.error("Blog GET error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
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
    if (body.content) {
      body.readingTime = calculateReadingTime(body.content);
    }
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const post = await BlogPost.create(body);
    return NextResponse.json(serialize(post), { status: 201 });
  } catch (error) {
    console.error("Blog POST error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
