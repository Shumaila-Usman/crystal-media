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
import { slugify } from "@/lib/utils";
import type { BlogPostData } from "@/types";

const empty: BlogPostData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "Crystal Media",
  featuredImage: "",
  readingTime: 5,
  published: false,
  featured: false,
};

export default function BlogPage() {
  const [items, setItems] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<BlogPostData>(empty);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await apiFetch<BlogPostData[]>("/api/blog"));
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
    const payload = { ...form, slug: form.slug || slugify(form.title) };
    try {
      if (form._id) {
        await apiFetch(`/api/blog/${form._id}`, { method: "PUT", body: JSON.stringify(payload) });
        toast.success("Article updated");
      } else {
        await apiFetch("/api/blog", { method: "POST", body: JSON.stringify(payload) });
        toast.success("Article created");
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
      await apiFetch(`/api/blog/${deleteId}`, { method: "DELETE" });
      toast.success("Article deleted");
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
        title="Blog"
        description="Manage articles and insights"
        actions={
          <button type="button" onClick={() => { setForm(empty); setFormOpen(true); }} className="flex items-center gap-2 rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white">
            <Plus className="h-4 w-4" /> Add Article
          </button>
        }
      />
      <div className="p-6">
        <DataTable loading={loading} data={items} keyField="_id" columns={[
          { key: "title", header: "Title" },
          { key: "category", header: "Category" },
          { key: "published", header: "Status", render: (p) => p.published ? "Published" : "Draft" },
          { key: "actions", header: "Actions", render: (p) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => { setForm({ ...p }); setFormOpen(true); }} className="rounded-lg p-2 text-muted-text hover:text-electric-purple"><Pencil className="h-4 w-4" /></button>
              <button type="button" onClick={() => setDeleteId(p._id!)} className="rounded-lg p-2 text-muted-text hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          )},
        ]} />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-black/80" onClick={() => setFormOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto">
            <AdminForm title={form._id ? "Edit Article" : "Add Article"} onSubmit={handleSave} loading={saving} onCancel={() => setFormOpen(false)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Title" required>
                  <input className={inputClassName} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form._id ? form.slug : slugify(e.target.value) })} required />
                </FormField>
                <FormField label="Slug" required>
                  <input className={inputClassName} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
                </FormField>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Category" required>
                  <input className={inputClassName} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                </FormField>
                <FormField label="Author">
                  <input className={inputClassName} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                </FormField>
              </div>
              <FormField label="Excerpt" required>
                <textarea className={textareaClassName} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} required />
              </FormField>
              <FormField label="Content" required>
                <textarea className={textareaClassName} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} required />
              </FormField>
              <ImageUpload label="Featured Image" value={form.featuredImage} folder="crystal-media/blog" onChange={(url) => setForm({ ...form, featuredImage: url })} />
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
