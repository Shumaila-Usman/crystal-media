import { Suspense } from "react";
import AdminLoginPage from "./AdminLoginClient";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-purple border-t-transparent" />
        </div>
      }
    >
      <AdminLoginPage />
    </Suspense>
  );
}
