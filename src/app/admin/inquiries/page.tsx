"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Download, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  FormField,
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/admin/AdminForm";
import { apiFetch } from "@/lib/admin-client";
import type { InquiryData } from "@/types";

const STATUS_OPTIONS = [
  "all",
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
] as const;

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState<InquiryData | null>(null);
  const [notes, setNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status !== "all") params.set("status", status);
      if (search) params.set("search", search);
      const data = await apiFetch<InquiryData[]>(`/api/inquiries?${params}`);
      setInquiries(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [status, search]);

  useEffect(() => {
    load();
  }, [load]);

  function openDetail(inquiry: InquiryData) {
    setSelected(inquiry);
    setNotes(inquiry.notes || "");
    setSelectedStatus(inquiry.status);
  }

  async function handleUpdate() {
    if (!selected?._id) return;
    setSaving(true);
    try {
      await apiFetch(`/api/inquiries/${selected._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: selectedStatus, notes }),
      });
      toast.success("Inquiry updated");
      setSelected(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/inquiries/${deleteId}`, { method: "DELETE" });
      toast.success("Inquiry deleted");
      setDeleteId(null);
      if (selected?._id === deleteId) setSelected(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  function handleExport() {
    const params = new URLSearchParams({ export: "csv" });
    if (status !== "all") params.set("status", status);
    if (search) params.set("search", search);
    window.open(`/api/inquiries?${params}`, "_blank");
    toast.success("Export started");
  }

  return (
    <>
      <AdminHeader
        title="Inquiries"
        description="Manage campaign and partnership leads"
        actions={
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-muted-text hover:text-pearl-white"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        }
      />

      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
            <input
              className={`${inputClassName} pl-10`}
              placeholder="Search by name, email, phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSearch(searchInput)}
            />
          </div>
          <select
            className={`${selectClassName} sm:w-48`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Statuses" : s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSearch(searchInput)}
            className="rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white"
          >
            Search
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DataTable
              loading={loading}
              data={inquiries}
              keyField="_id"
              columns={[
                {
                  key: "createdAt",
                  header: "Date",
                  render: (i) =>
                    i.createdAt
                      ? format(new Date(i.createdAt), "MMM d, yyyy")
                      : "—",
                },
                { key: "fullName", header: "Name" },
                { key: "email", header: "Email" },
                {
                  key: "status",
                  header: "Status",
                  render: (i) => (
                    <span className="capitalize">
                      {i.status.replace(/_/g, " ")}
                    </span>
                  ),
                },
                {
                  key: "view",
                  header: "",
                  render: (i) => (
                    <button
                      type="button"
                      onClick={() => openDetail(i)}
                      className="text-sm text-electric-purple hover:underline"
                    >
                      View
                    </button>
                  ),
                },
              ]}
            />
          </div>

          <div className="glass-card rounded-2xl p-5">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-lg font-semibold text-pearl-white">
                    {selected.fullName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setDeleteId(selected._id!)}
                    className="text-muted-text hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-text">Email:</span> {selected.email}</p>
                  <p><span className="text-muted-text">Phone:</span> {selected.phone}</p>
                  <p><span className="text-muted-text">Role:</span> {selected.role}</p>
                  <p><span className="text-muted-text">Type:</span> {selected.type}</p>
                  {selected.service && <p><span className="text-muted-text">Service:</span> {selected.service}</p>}
                  {selected.budget && <p><span className="text-muted-text">Budget:</span> {selected.budget}</p>}
                </div>

                <div>
                  <p className="mb-1 text-xs text-muted-text">Message</p>
                  <p className="rounded-xl bg-ink-black/50 p-3 text-sm">{selected.message}</p>
                </div>

                <FormField label="Status">
                  <select
                    className={selectClassName}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Notes">
                  <textarea
                    className={textareaClassName}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </FormField>

                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={saving}
                  className="w-full rounded-xl bg-electric-purple py-2.5 text-sm font-medium text-pearl-white disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-muted-text">
                Select an inquiry to view details
              </p>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message="This will permanently delete this inquiry."
      />
    </>
  );
}
