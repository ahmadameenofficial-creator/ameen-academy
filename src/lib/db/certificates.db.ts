import { prisma } from "@/lib/prisma";

export function findCertificate(userId: string, courseId: string) {
  return prisma.certificate.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
}

export function findCertificateByCode(code: string) {
  return prisma.certificate.findUnique({
    where: { certificateCode: code },
    include: {
      user: { select: { name: true } },
      course: { select: { title: true } },
    },
  });
}

export function createCertificate(userId: string, courseId: string, certificateCode: string) {
  return prisma.certificate.create({
    data: { userId, courseId, certificateCode },
  });
}

export function countCertificates() {
  return prisma.certificate.count();
}
