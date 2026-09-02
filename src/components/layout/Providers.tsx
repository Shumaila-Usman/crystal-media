"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#13091C",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#FCF9FD",
          },
        }}
      />
    </>
  );
}
