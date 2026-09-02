"use client";

import { useEffect, useState } from "react";
import { Users, Building2, Inbox, FileText } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { InquiryChart } from "@/components/admin/InquiryChart";
import { apiFetch } from "@/lib/admin-client";
import { toast } from "sonner";

interface DashboardStats {
  creators: number;
  brands: number;
  inquiries: number;
  articles: number;
  inquiryTrends: { date: string; count: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<DashboardStats>("/api/admin/stats")
      .then(setStats)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Overview of your Crystal Media platform"
      />

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-purple border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Creators"
                value={stats?.creators ?? 0}
                icon={Users}
              />
              <StatCard
                title="Brands"
                value={stats?.brands ?? 0}
                icon={Building2}
              />
              <StatCard
                title="Inquiries"
                value={stats?.inquiries ?? 0}
                icon={Inbox}
              />
              <StatCard
                title="Articles"
                value={stats?.articles ?? 0}
                icon={FileText}
              />
            </div>

            <InquiryChart data={stats?.inquiryTrends ?? []} />
          </div>
        )}
      </div>
    </>
  );
}
