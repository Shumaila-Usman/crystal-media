"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  AdminForm,
  FormField,
  inputClassName,
  textareaClassName,
} from "@/components/admin/AdminForm";
import { apiFetch } from "@/lib/admin-client";
import type { SiteSettingsData } from "@/types";

export default function SettingsPage() {
  const [form, setForm] = useState<SiteSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch<SiteSettingsData>("/api/settings")
      .then(setForm)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      const updated = await apiFetch<SiteSettingsData>("/api/settings", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setForm(updated);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof SiteSettingsData>(
    key: K,
    value: SiteSettingsData[K]
  ) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateStat(key: keyof SiteSettingsData["stats"], value: number) {
    setForm((prev) =>
      prev
        ? { ...prev, stats: { ...prev.stats, [key]: value } }
        : prev
    );
  }

  if (loading || !form) {
    return (
      <>
        <AdminHeader title="Settings" />
        <div className="flex items-center justify-center p-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-purple border-t-transparent" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title="Settings"
        description="Manage site-wide configuration"
      />

      <div className="p-6">
        <AdminForm onSubmit={handleSubmit} loading={saving} submitLabel="Save Settings">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Site Name">
              <input className={inputClassName} value={form.siteName} onChange={(e) => updateField("siteName", e.target.value)} />
            </FormField>
            <FormField label="Tagline">
              <input className={inputClassName} value={form.tagline} onChange={(e) => updateField("tagline", e.target.value)} />
            </FormField>
          </div>

          <FormField label="Description">
            <textarea className={textareaClassName} value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={3} />
          </FormField>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Contact Email">
              <input type="email" className={inputClassName} value={form.contactEmail} onChange={(e) => updateField("contactEmail", e.target.value)} />
            </FormField>
            <FormField label="Receiver Email">
              <input type="email" className={inputClassName} value={form.receiverEmail} onChange={(e) => updateField("receiverEmail", e.target.value)} />
            </FormField>
            <FormField label="Phone">
              <input className={inputClassName} value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
            </FormField>
            <FormField label="WhatsApp Number">
              <input className={inputClassName} value={form.whatsappNumber} onChange={(e) => updateField("whatsappNumber", e.target.value)} />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FormField label="Instagram URL">
              <input className={inputClassName} value={form.instagramUrl} onChange={(e) => updateField("instagramUrl", e.target.value)} />
            </FormField>
            <FormField label="Facebook URL">
              <input className={inputClassName} value={form.facebookUrl} onChange={(e) => updateField("facebookUrl", e.target.value)} />
            </FormField>
            <FormField label="LinkedIn URL">
              <input className={inputClassName} value={form.linkedinUrl} onChange={(e) => updateField("linkedinUrl", e.target.value)} />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Lahore Location">
              <input className={inputClassName} value={form.locationLahore} onChange={(e) => updateField("locationLahore", e.target.value)} />
            </FormField>
            <FormField label="Karachi Location">
              <input className={inputClassName} value={form.locationKarachi} onChange={(e) => updateField("locationKarachi", e.target.value)} />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Business Hours">
              <input className={inputClassName} value={form.businessHours} onChange={(e) => updateField("businessHours", e.target.value)} />
            </FormField>
            <FormField label="Response Time">
              <input className={inputClassName} value={form.responseTime} onChange={(e) => updateField("responseTime", e.target.value)} />
            </FormField>
          </div>

          <div className="rounded-xl border border-white/8 p-4">
            <h3 className="mb-4 text-sm font-medium text-pearl-white">Homepage Stats</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Campaigns Delivered">
                <input type="number" className={inputClassName} value={form.stats.campaignsDelivered ?? ""} onChange={(e) => updateStat("campaignsDelivered", Number(e.target.value))} />
              </FormField>
              <FormField label="Creators Represented">
                <input type="number" className={inputClassName} value={form.stats.creatorsRepresented ?? ""} onChange={(e) => updateStat("creatorsRepresented", Number(e.target.value))} />
              </FormField>
              <FormField label="Combined Audience Reach">
                <input type="number" className={inputClassName} value={form.stats.combinedAudienceReach ?? ""} onChange={(e) => updateStat("combinedAudienceReach", Number(e.target.value))} />
              </FormField>
              <FormField label="Repeat Brand Partnerships">
                <input type="number" className={inputClassName} value={form.stats.repeatBrandPartnerships ?? ""} onChange={(e) => updateStat("repeatBrandPartnerships", Number(e.target.value))} />
              </FormField>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Google Analytics ID">
              <input className={inputClassName} value={form.googleAnalyticsId || ""} onChange={(e) => updateField("googleAnalyticsId", e.target.value)} />
            </FormField>
            <FormField label="Meta Pixel ID">
              <input className={inputClassName} value={form.metaPixelId || ""} onChange={(e) => updateField("metaPixelId", e.target.value)} />
            </FormField>
          </div>

          <FormField label="Default SEO Title">
            <input className={inputClassName} value={form.defaultSeoTitle} onChange={(e) => updateField("defaultSeoTitle", e.target.value)} />
          </FormField>
          <FormField label="Default SEO Description">
            <textarea className={textareaClassName} value={form.defaultSeoDescription} onChange={(e) => updateField("defaultSeoDescription", e.target.value)} rows={2} />
          </FormField>
        </AdminForm>
      </div>
    </>
  );
}
