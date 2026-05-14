import { Suspense } from "react";
import { ResetForm } from "./reset-form";
import { IconLoader2 } from "@tabler/icons-react";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <IconLoader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      }
    >
      <ResetForm />
    </Suspense>
  );
}
