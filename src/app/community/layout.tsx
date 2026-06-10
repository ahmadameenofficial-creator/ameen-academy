import { Navbar } from "@/components/layout/navbar";
import { PushPrompt } from "@/components/shared/push-prompt";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <PushPrompt />
    </>
  );
}
