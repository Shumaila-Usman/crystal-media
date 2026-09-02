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
import type { ServiceData } from "@/types";

const emptyService: ServiceData = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  icon: "sparkles",
  benefits: [],
  problems: [],
  deliverables: [],
  process: [],
  idealClient: "",
  faqs: [],
  published: true,
  sortOrder: 0,
};

export default function ServicesPage() {
  const [items, setItems] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<ServiceData>(emptyService);
  const [benefitsText, setBenefitsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await apiFetch<ServiceData[]>("/api/services"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(emptyService);
    setBenefitsText("");
    setFormOpen(true);
  }

  function openEdit(item: ServiceData) {
    setForm({ ...item });
    setBenefitsText((item.benefits || []).join("\n"));
    setFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      benefits: benefitsText.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (form._id) {
        await apiFetch(`/api/services/${form._id}`, { method: "PUT", body: JSON.stringify(payload) });
        toast.success("Service updated");
      } else {
        await apiFetch("/api/services", { method: "POST", body: JSON.stringify(payload) });
        toast.success("Service created");
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
      await apiFetch(`/api/services/${deleteId}`, { method: "DELETE" });
      toast.success("Service deleted");
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
        title="Services"
        description="Manage agency services"
        actions={
          <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white">
            <Plus className="h-4 w-4" /> Add Service
          </button>
        }
      />
      <div className="p-6">
        <DataTable loading={loading} data={items} keyField="_id" columns={[
          { key: "title", header: "Title" },
          { key: "slug", header: "Slug" },
          { key: "published", header: "Status", render: (s) => s.published ? "Published" : "Draft" },
          { key: "actions", header: "Actions", render: (s) => (
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(s)} className="rounded-lg p-2 text-muted-text hover:text-electric-purple"><Pencil className="h-4 w-4" /></button>
              <button type="button" onClick={() => setDeleteId(s._id!)} className="rounded-lg p-2 text-muted-text hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </div>
          )},
        ]} />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-black/80" onClick={() => setFormOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto">
            <AdminForm title={form._id ? "Edit Service" : "Add Service"} onSubmit={handleSave} loading={saving} onCancel={() => setFormOpen(false)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Title" required>
                  <input className={inputClassName} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form._id ? form.slug : slugify(e.target.value) })} required />
                </FormField>
                <FormField label="Slug" required>
                  <input className={inputClassName} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
                </FormField>
              </div>
              <FormField label="Short Description" required>
                <input className={inputClassName} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} required />
              </FormField>
              <FormField label="Description">
                <textarea className={textareaClassName} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
              </FormField>
              <FormField label="Benefits" hint="One per line">
                <textarea className={textareaClassName} value={benefitsText} onChange={(e) => setBenefitsText(e.target.value)} rows={4} />
              </FormField>
              <FormField label="Ideal Client">
                <textarea className={textareaClassName} value={form.idealClient} onChange={(e) => setForm({ ...form, idealClient: e.target.value })} rows={2} />
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
