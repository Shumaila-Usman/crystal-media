"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  AdminForm,
  FormField,
  inputClassName,
  textareaClassName,
} from "@/components/admin/AdminForm";
import { apiFetch } from "@/lib/admin-client";
import type { FAQData } from "@/types";

const empty: FAQData = {
  question: "",
  answer: "",
  sortOrder: 0,
  published: true,
};

export default function FAQsPage() {
  const [items, setItems] = useState<FAQData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FAQData>(empty);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await apiFetch<FAQData[]>("/api/faqs"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (form._id) {
        await apiFetch(`/api/faqs/${form._id}`, { method: "PUT", body: JSON.stringify(form) });
        toast.success("FAQ updated");
      } else {
        await apiFetch("/api/faqs", { method: "POST", body: JSON.stringify(form) });
        toast.success("FAQ created");
      }
      setFormOpen(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/faqs/${deleteId}`, { method: "DELETE" });
      toast.success("FAQ deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="FAQs"
        description="Manage frequently asked questions"
        actions={
          <button type="button" onClick={() => { setForm(empty); setFormOpen(true); }} className="flex items-center gap-2 rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white">
            <Plus className="h-4 w-4" /> Add FAQ
          </button>
        }
      />
      <div className="p-6">
        <DataTable loading={loading} data={items} keyField="_id" columns={[
          { key: "question", header: "Question" },
          { key: "sortOrder", header: "Order" },
          { key: "published", header: "Status", render: (f) => f.published ? "Published" : "Draft" },
          { key: "actions", header: "Actions", render: (f) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => { setForm({ ...f }); setFormOpen(true); }} className="rounded-lg p-2 text-muted-text hover:text-electric-purple"><Pencil className="h-4 w-4" /></button>
              <button type="button" onClick={() => setDeleteId(f._id!)} className="rounded-lg p-2 text-muted-text hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          )},
        ]} />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-black/80" onClick={() => setFormOpen(false)} />
          <div className="relative w-full max-w-lg">
            <AdminForm title={form._id ? "Edit FAQ" : "Add FAQ"} onSubmit={handleSave} loading={saving} onCancel={() => setFormOpen(false)}>
              <FormField label="Question" required>
                <input className={inputClassName} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
              </FormField>
              <FormField label="Answer" required>
                <textarea className={textareaClassName} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={5} required />
              </FormField>
              <FormField label="Sort Order">
                <input type="number" className={inputClassName} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
              </FormField>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Published
              </label>
            </AdminForm>
          </div>
        </div>
      )}
      <ConfirmDialog open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </>
  );
}
