import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB, isDBConfigured } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isDBConfigured()) {
      await connectDB();
      const admin = await AdminUser.findOne({ email: session.email })
        .select("-passwordHash")
        .lean();

      if (admin) {
        return NextResponse.json({
          user: {
            email: admin.email,
            name: admin.name,
            role: session.role,
          },
        });
      }
    }

    return NextResponse.json({
      user: { email: session.email, role: session.role },
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { error: "Failed to get session" },
      { status: 500 }
    );
  }
}
