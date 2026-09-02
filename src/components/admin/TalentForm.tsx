"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  AdminForm,
  FormField,
  inputClassName,
  textareaClassName,
} from "@/components/admin/AdminForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { apiFetch } from "@/lib/admin-client";
import { slugify } from "@/lib/utils";
import type { TalentData } from "@/types";

const emptyTalent: Partial<TalentData> = {
  name: "",
  slug: "",
  niche: "",
  city: "",
  bio: "",
  specialties: [],
  image: "",
  gallery: [],
  platforms: {},
  metrics: {},
  totalFollowers: 0,
  engagementRate: 0,
  featured: false,
  published: true,
  sortOrder: 0,
  campaignLogos: [],
  seoTitle: "",
  seoDescription: "",
};

export function TalentForm({ talentId }: { talentId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<TalentData>>(emptyTalent);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!talentId);
  const [specialtiesText, setSpecialtiesText] = useState("");
  const [galleryText, setGalleryText] = useState("");

  useEffect(() => {
    if (!talentId) return;
    setFetching(true);
    apiFetch<TalentData>(`/api/talents/${talentId}`)
      .then((data) => {
        setForm(data);
        setSpecialtiesText((data.specialties || []).join(", "));
        setGalleryText((data.gallery || []).join("\n"));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setFetching(false));
  }, [talentId]);

  function updateField<K extends keyof TalentData>(key: K, value: TalentData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updatePlatform(platform: "instagram" | "tiktok" | "youtube", value: string) {
    setForm((prev) => ({
      ...prev,
      platforms: { ...prev.platforms, [platform]: value },
    }));
  }

  function updateMetric(
    platform: "instagram" | "tiktok" | "youtube",
    field: "followers" | "engagementRate",
    value: number
  ) {
    setForm((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [platform]: {
          followers: prev.metrics?.[platform]?.followers ?? 0,
          engagementRate: prev.metrics?.[platform]?.engagementRate ?? 0,
          [field]: value,
        },
      },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      slug: form.slug || slugify(form.name || ""),
      specialties: specialtiesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      gallery: galleryText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (talentId) {
        await apiFetch(`/api/talents/${talentId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Talent updated");
      } else {
        await apiFetch("/api/talents", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Talent created");
      }
      router.push("/admin/talents");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <>
        <AdminHeader title={talentId ? "Edit Talent" : "New Talent"} />
        <div className="flex items-center justify-center p-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-purple border-t-transparent" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title={talentId ? "Edit Talent" : "New Talent"}
        description="Manage creator profile details"
      />

      <div className="p-6">
        <AdminForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel={talentId ? "Update Talent" : "Create Talent"}
          onCancel={() => router.push("/admin/talents")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Name" required>
              <input
                className={inputClassName}
                value={form.name || ""}
                onChange={(e) => {
                  updateField("name", e.target.value);
                  if (!talentId) updateField("slug", slugify(e.target.value));
                }}
                required
              />
            </FormField>

            <FormField label="Slug" required>
              <input
                className={inputClassName}
                value={form.slug || ""}
                onChange={(e) => updateField("slug", e.target.value)}
                required
              />
            </FormField>

            <FormField label="Niche" required>
              <input
                className={inputClassName}
                value={form.niche || ""}
                onChange={(e) => updateField("niche", e.target.value)}
                required
              />
            </FormField>

            <FormField label="City" required>
              <input
                className={inputClassName}
                value={form.city || ""}
                onChange={(e) => updateField("city", e.target.value)}
                required
              />
            </FormField>
          </div>

          <FormField label="Bio">
            <textarea
              className={textareaClassName}
              value={form.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
              rows={4}
            />
          </FormField>

          <FormField label="Specialties" hint="Comma-separated">
            <input
              className={inputClassName}
              value={specialtiesText}
              onChange={(e) => setSpecialtiesText(e.target.value)}
              placeholder="Fashion, Lifestyle, Beauty"
            />
          </FormField>

          <ImageUpload
            label="Profile Image"
            value={form.image}
            folder="crystal-media/talents"
            onChange={(url, publicId) => {
              updateField("image", url);
              if (publicId) updateField("imagePublicId", publicId);
            }}
          />

          <FormField label="Gallery URLs" hint="One URL per line">
            <textarea
              className={textareaClassName}
              value={galleryText}
              onChange={(e) => setGalleryText(e.target.value)}
              rows={3}
            />
          </FormField>

          <div className="rounded-xl border border-white/8 p-4">
            <h3 className="mb-4 text-sm font-medium text-pearl-white">Platforms</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {(["instagram", "tiktok", "youtube"] as const).map((platform) => (
                <div key={platform} className="space-y-3">
                  <FormField label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
                    <input
                      className={inputClassName}
                      value={form.platforms?.[platform] || ""}
                      onChange={(e) => updatePlatform(platform, e.target.value)}
                      placeholder={`@${platform}handle`}
                    />
                  </FormField>
                  <FormField label="Followers">
                    <input
                      type="number"
                      className={inputClassName}
                      value={form.metrics?.[platform]?.followers ?? 0}
                      onChange={(e) =>
                        updateMetric(platform, "followers", Number(e.target.value))
                      }
                    />
                  </FormField>
                  <FormField label="Engagement %">
                    <input
                      type="number"
                      step="0.1"
                      className={inputClassName}
                      value={form.metrics?.[platform]?.engagementRate ?? 0}
                      onChange={(e) =>
                        updateMetric(platform, "engagementRate", Number(e.target.value))
                      }
                    />
                  </FormField>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FormField label="Total Followers">
              <input
                type="number"
                className={inputClassName}
                value={form.totalFollowers ?? 0}
                onChange={(e) => updateField("totalFollowers", Number(e.target.value))}
              />
            </FormField>
            <FormField label="Engagement Rate %">
              <input
                type="number"
                step="0.1"
                className={inputClassName}
                value={form.engagementRate ?? 0}
                onChange={(e) => updateField("engagementRate", Number(e.target.value))}
              />
            </FormField>
            <FormField label="Sort Order">
              <input
                type="number"
                className={inputClassName}
                value={form.sortOrder ?? 0}
                onChange={(e) => updateField("sortOrder", Number(e.target.value))}
              />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="SEO Title">
              <input
                className={inputClassName}
                value={form.seoTitle || ""}
                onChange={(e) => updateField("seoTitle", e.target.value)}
              />
            </FormField>
            <FormField label="SEO Description">
              <input
                className={inputClassName}
                value={form.seoDescription || ""}
                onChange={(e) => updateField("seoDescription", e.target.value)}
              />
            </FormField>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-pearl-white">
              <input
                type="checkbox"
                checked={form.featured ?? false}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="rounded border-white/20"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-pearl-white">
              <input
                type="checkbox"
                checked={form.published ?? true}
                onChange={(e) => updateField("published", e.target.checked)}
                className="rounded border-white/20"
              />
              Published
            </label>
          </div>
        </AdminForm>
      </div>
    </>
  );
}
