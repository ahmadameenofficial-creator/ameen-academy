import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { IconLoader2 } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <IconLoader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
