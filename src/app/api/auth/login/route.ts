import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";
import {
  createSession,
  verifyPassword,
  COOKIE_NAME,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { ensureDb } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    await connectDB();
    const user = await AdminUser.findOne({ email: email.toLowerCase() });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createSession(user.email);
    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
