import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB, isDBConfigured } from "./db";

export async function ensureDb() {
  if (!isDBConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const conn = await connectDB();
  if (!conn) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 503 }
    );
  }

  return null;
}

export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") || "20", 10))
  );
  return { page, limit, skip: (page - 1) * limit };
}
