"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { apiFetch } from "@/lib/admin-client";
import type { TalentData } from "@/types";

export default function TalentsPage() {
  const [talents, setTalents] = useState<TalentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function loadTalents() {
    setLoading(true);
    try {
      const data = await apiFetch<TalentData[]>("/api/talents");
      setTalents(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load talents");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTalents();
  }, []);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/talents/${deleteId}`, { method: "DELETE" });
      toast.success("Talent deleted");
      setDeleteId(null);
      loadTalents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Talents"
        description="Manage creator profiles"
        actions={
          <Link
            href="/admin/talents/new"
            className="flex items-center gap-2 rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Talent
          </Link>
        }
      />

      <div className="p-6">
        <DataTable
          loading={loading}
          data={talents}
          keyField="_id"
          columns={[
            {
              key: "image",
              header: "",
              className: "w-14",
              render: (t) =>
                t.image ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-xs text-muted-text">
                    N/A
                  </div>
                ),
            },
            { key: "name", header: "Name" },
            { key: "niche", header: "Niche" },
            { key: "city", header: "City" },
            {
              key: "totalFollowers",
              header: "Followers",
              render: (t) => t.totalFollowers.toLocaleString(),
            },
            {
              key: "published",
              header: "Status",
              render: (t) => (
                <span
                  className={
                    t.published
                      ? "text-green-400"
                      : "text-muted-text"
                  }
                >
                  {t.published ? "Published" : "Draft"}
                </span>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (t) => (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/talents/${t._id}`}
                    className="rounded-lg p-2 text-muted-text transition-colors hover:bg-white/5 hover:text-electric-purple"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteId(t._id!)}
                    className="rounded-lg p-2 text-muted-text transition-colors hover:bg-white/5 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message="This will permanently delete this talent profile."
      />
    </>
  );
}
