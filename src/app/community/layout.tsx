import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "المجتمع",
  description: "مجتمع أكاديمية أمين — شارك وتعلّم مع باقي الطلاب",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
