import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MessagesView } from "./messages-view";

export const metadata = {
  title: "الرسائل — المجتمع",
};

export default async function MessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <MessagesView
      currentUser={{
        id: session.user.id,
        name: session.user.name || "بدون اسم",
        image: session.user.image || null,
      }}
    />
  );
}
