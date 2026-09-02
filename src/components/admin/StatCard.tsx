import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-text">{title}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-pearl-white">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-xs text-electric-purple">{trend}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-purple/15">
          <Icon className="h-5 w-5 text-electric-purple" />
        </div>
      </div>
    </div>
  );
}
