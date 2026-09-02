import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Talent } from "@/models/Talent";
import { Brand } from "@/models/Brand";
import { Inquiry } from "@/models/Inquiry";
import { BlogPost } from "@/models/BlogPost";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [creators, brands, inquiries, articles, recentInquiries] =
      await Promise.all([
        Talent.countDocuments(),
        Brand.countDocuments(),
        Inquiry.countDocuments(),
        BlogPost.countDocuments(),
        Inquiry.find({ createdAt: { $gte: thirtyDaysAgo } })
          .select("createdAt")
          .lean(),
      ]);

    const trendMap = new Map<string, number>();
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      trendMap.set(key, 0);
    }

    for (const inquiry of recentInquiries) {
      const key = new Date(inquiry.createdAt).toISOString().split("T")[0];
      if (trendMap.has(key)) {
        trendMap.set(key, (trendMap.get(key) || 0) + 1);
      }
    }

    const inquiryTrends = Array.from(trendMap.entries()).map(
      ([date, count]) => ({ date, count })
    );

    return NextResponse.json(
      serialize({
        creators,
        brands,
        inquiries,
        articles,
        inquiryTrends,
      })
    );
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
