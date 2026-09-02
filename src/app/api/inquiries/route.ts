import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb, serialize } from "@/lib/api-utils";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
import { format } from "date-fns";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const dbError = await ensureDb();
  if (dbError) return dbError;

  try {
    await connectDB();
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const exportCsv = searchParams.get("export") === "csv";

    const query: Record<string, unknown> = {};
    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { fullName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
        { message: new RegExp(search, "i") },
      ];
    }

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .lean();

    if (exportCsv) {
      const headers = [
        "Date",
        "Name",
        "Email",
        "Phone",
        "Type",
        "Role",
        "Status",
        "Service",
        "Budget",
        "Message",
        "Notes",
      ];
      const rows = inquiries.map((i) => [
        i.createdAt ? format(new Date(i.createdAt), "yyyy-MM-dd HH:mm") : "",
        i.fullName,
        i.email,
        i.phone,
        i.type,
        i.role,
        i.status,
        i.service || "",
        i.budget || "",
        `"${(i.message || "").replace(/"/g, '""')}"`,
        `"${(i.notes || "").replace(/"/g, '""')}"`,
      ]);

      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join(
        "\n"
      );

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="inquiries-${format(new Date(), "yyyy-MM-dd")}.csv"`,
        },
      });
    }

    return NextResponse.json(serialize(inquiries));
  } catch (error) {
    console.error("Inquiries GET error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
