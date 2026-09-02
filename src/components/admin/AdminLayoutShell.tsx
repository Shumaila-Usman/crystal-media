"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { cn } from "@/lib/utils";

const AdminShellContext = createContext({
  openSidebar: () => {},
});

export function useAdminShell() {
  return useContext(AdminShellContext);
}

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return (
      <div className="min-h-screen bg-ink-black text-pearl-white">{children}</div>
    );
  }

  return (
    <AdminShellContext.Provider
      value={{ openSidebar: () => setSidebarOpen(true) }}
    >
      <div className="min-h-screen bg-ink-black text-pearl-white">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-ink-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
        )}

        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 transition-transform lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <AdminSidebar />
        </div>

        <div className="lg:pl-64">{children}</div>
      </div>
    </AdminShellContext.Provider>
  );
}
