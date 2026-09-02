"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/admin-client";
import { useAdminShell } from "./AdminLayoutShell";

interface AdminHeaderProps {
  title: string;
  description?: string;
  onMenuClick?: () => void;
  actions?: React.ReactNode;
}

export function AdminHeader({
  title,
  description,
  onMenuClick,
  actions,
}: AdminHeaderProps) {
  const router = useRouter();
  const { openSidebar } = useAdminShell();

  async function handleLogout() {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Failed to logout");
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-ink-black/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick || openSidebar}
          className="rounded-lg p-2 text-muted-text hover:bg-white/5 hover:text-pearl-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-lg font-semibold text-pearl-white">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-text">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-muted-text transition-colors hover:border-red-400/40 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
