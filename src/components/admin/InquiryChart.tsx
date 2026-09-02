"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface TrendPoint {
  date: string;
  count: number;
}

interface InquiryChartProps {
  data: TrendPoint[];
  className?: string;
}

export function InquiryChart({ data, className }: InquiryChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const formatted = data.map((d) => ({
    ...d,
    label: format(parseISO(d.date), "MMM d"),
  }));

  return (
    <div className={cn("glass-card rounded-2xl p-6", className)}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-pearl-white">
            Inquiry Trends
          </h3>
          <p className="text-sm text-muted-text">Last 30 days</p>
        </div>
        <div className="flex rounded-lg border border-white/10 p-0.5">
          <button
            type="button"
            onClick={() => setChartType("line")}
            className={cn(
              "rounded-md px-3 py-1 text-xs transition-colors",
              chartType === "line"
                ? "bg-electric-purple/20 text-pearl-white"
                : "text-muted-text hover:text-pearl-white"
            )}
          >
            Line
          </button>
          <button
            type="button"
            onClick={() => setChartType("bar")}
            className={cn(
              "rounded-md px-3 py-1 text-xs transition-colors",
              chartType === "bar"
                ? "bg-electric-purple/20 text-pearl-white"
                : "text-muted-text hover:text-pearl-white"
            )}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={formatted}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#a99faf", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#a99faf", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#13091C",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  color: "#FCF9FD",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#A33AD1"
                strokeWidth={2}
                dot={{ fill: "#A33AD1", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          ) : (
            <BarChart data={formatted}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#a99faf", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#a99faf", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#13091C",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  color: "#FCF9FD",
                }}
              />
              <Bar dataKey="count" fill="#A33AD1" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
