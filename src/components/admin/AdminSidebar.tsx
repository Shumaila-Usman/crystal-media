"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Package,
  MessageSquareQuote,
  FileText,
  HelpCircle,
  Inbox,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/talents", label: "Talents", icon: Users },
  { href: "/admin/brands", label: "Brands", icon: Building2 },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/8 bg-midnight-plum">
      <div className="flex h-16 items-center gap-2 border-b border-white/8 px-6">
        <Sparkles className="h-5 w-5 text-electric-purple" />
        <div>
          <p className="font-display text-sm font-semibold text-pearl-white">
            Crystal Media
          </p>
          <p className="text-xs text-muted-text">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-electric-purple/20 text-pearl-white"
                  : "text-muted-text hover:bg-white/5 hover:text-pearl-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center rounded-xl border border-white/10 px-3 py-2 text-xs text-muted-text transition-colors hover:border-electric-purple/40 hover:text-pearl-white"
        >
          View Public Site
        </Link>
      </div>
    </aside>
  );
}
