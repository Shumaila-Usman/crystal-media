"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  AdminForm,
  FormField,
  inputClassName,
} from "@/components/admin/AdminForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { apiFetch } from "@/lib/admin-client";
import type { BrandData } from "@/types";

const emptyBrand: BrandData = {
  name: "",
  logo: "",
  website: "",
  sortOrder: 0,
  active: true,
};

export default function BrandsPage() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<BrandData>(emptyBrand);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setBrands(await apiFetch<BrandData[]>("/api/brands"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setForm(emptyBrand);
    setFormOpen(true);
  }

  function openEdit(brand: BrandData) {
    setForm({ ...brand });
    setFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (form._id) {
        await apiFetch(`/api/brands/${form._id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        toast.success("Brand updated");
      } else {
        await apiFetch("/api/brands", {
          method: "POST",
          body: JSON.stringify(form),
        });
        toast.success("Brand created");
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
      await apiFetch(`/api/brands/${deleteId}`, { method: "DELETE" });
      toast.success("Brand deleted");
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
        title="Brands"
        description="Manage partner brand logos"
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-electric-purple px-4 py-2 text-sm font-medium text-pearl-white"
          >
            <Plus className="h-4 w-4" />
            Add Brand
          </button>
        }
      />

      <div className="p-6">
        <DataTable
          loading={loading}
          data={brands}
          keyField="_id"
          columns={[
            {
              key: "logo",
              header: "",
              className: "w-14",
              render: (b) =>
                b.logo ? (
                  <div className="relative h-10 w-16">
                    <Image src={b.logo} alt={b.name} fill className="object-contain" unoptimized />
                  </div>
                ) : (
                  <span className="text-muted-text">—</span>
                ),
            },
            { key: "name", header: "Name" },
            { key: "website", header: "Website" },
            {
              key: "active",
              header: "Status",
              render: (b) => (b.active ? "Active" : "Inactive"),
            },
            {
              key: "actions",
              header: "Actions",
              render: (b) => (
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(b)} className="rounded-lg p-2 text-muted-text hover:text-electric-purple">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => setDeleteId(b._id!)} className="rounded-lg p-2 text-muted-text hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-black/80" onClick={() => setFormOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto">
            <AdminForm
              title={form._id ? "Edit Brand" : "Add Brand"}
              onSubmit={handleSave}
              loading={saving}
              onCancel={() => setFormOpen(false)}
            >
              <FormField label="Name" required>
                <input className={inputClassName} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </FormField>
              <ImageUpload
                label="Logo"
                value={form.logo}
                folder="crystal-media/brands"
                onChange={(url, publicId) => setForm({ ...form, logo: url, logoPublicId: publicId })}
              />
              <FormField label="Website">
                <input className={inputClassName} value={form.website || ""} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </FormField>
              <FormField label="Sort Order">
                <input type="number" className={inputClassName} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
              </FormField>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                Active
              </label>
            </AdminForm>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </>
  );
}
