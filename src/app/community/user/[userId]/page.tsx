import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconUser,
  IconBook,
  IconMessage,
  IconCalendar,
  IconShield,
} from "@tabler/icons-react";

interface PageProps {
  params: Promise<{ userId: string }>;
}

async function getUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId, isBanned: false },
    select: {
      id: true,
      name: true,
      bio: true,
      image: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
          posts: { where: { isDeleted: false } },
        },
      },
    },
  });
}

async function getUserPosts(userId: string) {
  return prisma.post.findMany({
    where: { userId, isDeleted: false },
    include: {
      user: { select: { id: true, name: true, image: true, role: true } },
      _count: { select: { comments: true, likes: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { userId } = await params;
  const user = await getUser(userId);
  if (!user) return { title: "مش موجود" };
  return { title: `بروفايل ${user.name}` };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { userId } = await params;
  const [user, posts] = await Promise.all([
    getUser(userId),
    getUserPosts(userId),
  ]);

  if (!user) notFound();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-gradient-to-b from-brand-50 to-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto">
            <CardContent className="p-6 flex flex-col items-center text-center">
              {/* الصورة */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover border-4 border-brand-100"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-brand-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-brand-100">
                  {user.name.charAt(0)}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
                {user.role === "ADMIN" && (
                  <Badge variant="solid">
                    <IconShield className="h-3 w-3" /> أدمن
                  </Badge>
                )}
              </div>

              {user.bio && (
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">{user.bio}</p>
              )}

              {/* إحصائيات */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border w-full justify-center">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center text-brand-500">
                    <IconBook className="h-4 w-4" />
                    <span className="font-bold text-foreground">{user._count.enrollments}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">كورس</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center text-brand-500">
                    <IconMessage className="h-4 w-4" />
                    <span className="font-bold text-foreground">{user._count.posts}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">منشور</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center text-brand-500">
                    <IconCalendar className="h-4 w-4" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    انضم {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* منشورات اليوزر */}
      <div className="container mx-auto px-4 py-6 max-w-xl">
        <h2 className="text-lg font-bold text-foreground mb-4">
          منشورات {user.name.split(" ")[0]}
        </h2>

        {posts.length === 0 ? (
          <Card className="p-8 text-center">
            <IconUser className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">مفيش منشورات لسه</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-4 space-y-2">
                <p className="text-sm text-foreground whitespace-pre-line">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span>{post._count.likes} إعجاب</span>
                  <span>{post._count.comments} تعليق</span>
                  <span>{new Date(post.createdAt).toLocaleDateString("ar-EG")}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
