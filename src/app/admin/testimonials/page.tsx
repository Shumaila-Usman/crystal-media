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
import { ImageUpload } from "@/components/admin/ImageUpload";
import { apiFetch } from "@/lib/admin-client";
import type { TestimonialData } from "@/types";

const empty: TestimonialData = {
  brandName: "",
  brandLogo: "",
  reviewerName: "",
  reviewerRole: "",
  rating: 5,
  review: "",
  category: "",
  featured: false,
  published: true,
  sortOrder: 0,
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<TestimonialData>(empty);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await apiFetch<TestimonialData[]>("/api/testimonials"));
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
        await apiFetch(`/api/testimonials/${form._id}`, { method: "PUT", body: JSON.stringify(form) });
        toast.success("Testimonial updated");
      } else {
        await apiFetch("/api/testimonials", { method: "POST", body: JSON.stringify(form) });
        toast.success("Testimonial created");
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
      await apiFetch(`/api/testimonials/${deleteId}`, { method: "DELETE" });
      toast.success("Testimonial deleted");
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
        title="Testimonials"
        description="Manage client reviews"
        actions={
          <button type="button" onClick={() => { setForm(empty); setFormOpen(true); }} className="flex items-center gap-2 rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white">
            <Plus className="h-4 w-4" /> Add Testimonial
          </button>
        }
      />
      <div className="p-6">
        <DataTable loading={loading} data={items} keyField="_id" columns={[
          { key: "brandName", header: "Brand" },
          { key: "reviewerName", header: "Reviewer" },
          { key: "rating", header: "Rating", render: (t) => `${t.rating}/5` },
          { key: "published", header: "Status", render: (t) => t.published ? "Published" : "Draft" },
          { key: "actions", header: "Actions", render: (t) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => { setForm({ ...t }); setFormOpen(true); }} className="rounded-lg p-2 text-muted-text hover:text-electric-purple"><Pencil className="h-4 w-4" /></button>
              <button type="button" onClick={() => setDeleteId(t._id!)} className="rounded-lg p-2 text-muted-text hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          )},
        ]} />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-black/80" onClick={() => setFormOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto">
            <AdminForm title={form._id ? "Edit Testimonial" : "Add Testimonial"} onSubmit={handleSave} loading={saving} onCancel={() => setFormOpen(false)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Brand Name" required>
                  <input className={inputClassName} value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} required />
                </FormField>
                <FormField label="Category">
                  <input className={inputClassName} value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </FormField>
              </div>
              <ImageUpload label="Brand Logo" value={form.brandLogo} folder="crystal-media/testimonials" onChange={(url) => setForm({ ...form, brandLogo: url })} />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Reviewer Name" required>
                  <input className={inputClassName} value={form.reviewerName} onChange={(e) => setForm({ ...form, reviewerName: e.target.value })} required />
                </FormField>
                <FormField label="Reviewer Role" required>
                  <input className={inputClassName} value={form.reviewerRole} onChange={(e) => setForm({ ...form, reviewerRole: e.target.value })} required />
                </FormField>
              </div>
              <FormField label="Rating" required>
                <input type="number" min={1} max={5} className={inputClassName} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} required />
              </FormField>
              <FormField label="Review" required>
                <textarea className={textareaClassName} value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={4} required />
              </FormField>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
              </div>
            </AdminForm>
          </div>
        </div>
      )}
      <ConfirmDialog open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </>
  );
}
