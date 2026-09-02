"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/admin-client";
import { inputClassName } from "@/components/admin/AdminForm";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      toast.success("Welcome back!");
      const from = searchParams.get("from") || "/admin";
      router.push(from);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-purple/15">
            <Sparkles className="h-7 w-7 text-electric-purple" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-pearl-white">
            Crystal Media Admin
          </h1>
          <p className="mt-2 text-sm text-muted-text">
            Sign in to manage your content
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card space-y-4 rounded-2xl p-6"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-pearl-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputClassName}
              placeholder="admin@crystalmedia.pk"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-pearl-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={inputClassName}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-electric-purple py-3 text-sm font-medium text-pearl-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
