import { prisma } from "@/lib/prisma";

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function findStudents() {
  return prisma.user.findMany({
    where: { role: "STUDENT" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      bio: true,
      isBanned: true,
      bannedReason: true,
      createdAt: true,
      lastLoginAt: true,
      _count: {
        select: {
          enrollments: true,
          certificates: true,
          posts: { where: { isDeleted: false } },
          blogComments: true,
        },
      },
      enrollments: {
        select: {
          course: { select: { title: true } },
          completedAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export function countStudents() {
  return prisma.user.count({ where: { role: "STUDENT" } });
}

export function countBannedStudents() {
  return prisma.user.count({ where: { role: "STUDENT", isBanned: true } });
}

export function updateUser(id: string, data: Record<string, unknown>) {
  return prisma.user.update({ where: { id }, data });
}

export function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}

export function findTeamMembers() {
  return prisma.user.findMany({
    where: { role: { in: ["ADMIN", "INSTRUCTOR"] } },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
  });
}
