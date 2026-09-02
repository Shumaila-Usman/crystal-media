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
import { slugify } from "@/lib/utils";
import type { PackageData } from "@/types";

const emptyPackage: PackageData = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  features: [],
  bestFor: "",
  featured: false,
  price: "",
  published: true,
  sortOrder: 0,
};

export default function PackagesPage() {
  const [items, setItems] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<PackageData>(emptyPackage);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await apiFetch<PackageData[]>("/api/packages"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(emptyPackage);
    setFeaturesText("");
    setFormOpen(true);
  }

  function openEdit(item: PackageData) {
    setForm({ ...item });
    setFeaturesText((item.features || []).join("\n"));
    setFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      features: featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (form._id) {
        await apiFetch(`/api/packages/${form._id}`, { method: "PUT", body: JSON.stringify(payload) });
        toast.success("Package updated");
      } else {
        await apiFetch("/api/packages", { method: "POST", body: JSON.stringify(payload) });
        toast.success("Package created");
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
      await apiFetch(`/api/packages/${deleteId}`, { method: "DELETE" });
      toast.success("Package deleted");
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
        title="Packages"
        description="Manage pricing packages"
        actions={
          <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white">
            <Plus className="h-4 w-4" /> Add Package
          </button>
        }
      />
      <div className="p-6">
        <DataTable loading={loading} data={items} keyField="_id" columns={[
          { key: "name", header: "Name" },
          { key: "price", header: "Price" },
          { key: "featured", header: "Featured", render: (p) => p.featured ? "Yes" : "No" },
          { key: "published", header: "Status", render: (p) => p.published ? "Published" : "Draft" },
          { key: "actions", header: "Actions", render: (p) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(p)} className="rounded-lg p-2 text-muted-text hover:text-electric-purple"><Pencil className="h-4 w-4" /></button>
              <button type="button" onClick={() => setDeleteId(p._id!)} className="rounded-lg p-2 text-muted-text hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          )},
        ]} />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-black/80" onClick={() => setFormOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto">
            <AdminForm title={form._id ? "Edit Package" : "Add Package"} onSubmit={handleSave} loading={saving} onCancel={() => setFormOpen(false)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Name" required>
                  <input className={inputClassName} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form._id ? form.slug : slugify(e.target.value) })} required />
                </FormField>
                <FormField label="Slug" required>
                  <input className={inputClassName} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
                </FormField>
              </div>
              <FormField label="Tagline" required>
                <input className={inputClassName} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} required />
              </FormField>
              <FormField label="Description">
                <textarea className={textareaClassName} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </FormField>
              <FormField label="Features" hint="One per line">
                <textarea className={textareaClassName} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={4} />
              </FormField>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Price">
                  <input className={inputClassName} value={form.price || ""} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="From PKR 150,000" />
                </FormField>
                <FormField label="Best For">
                  <input className={inputClassName} value={form.bestFor} onChange={(e) => setForm({ ...form, bestFor: e.target.value })} />
                </FormField>
              </div>
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
