import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCertificatePDF } from "@/lib/certificate";

interface RouteContext {
  params: Promise<{ code: string }>;
}

export async function GET(_req: Request, context: RouteContext) {
  const { code } = await context.params;

  const certificate = await prisma.certificate.findUnique({
    where: { certificateCode: code },
    include: {
      user: { select: { name: true, certificateName: true } },
      course: { select: { title: true, price: true } },
    },
  });

  if (!certificate) {
    return NextResponse.json({ error: "شهادة مش موجودة" }, { status: 404 });
  }

  const pdfBytes = await generateCertificatePDF({
    studentName: certificate.user.certificateName || certificate.user.name || "Student",
    certificateCode: certificate.certificateCode,
    issuedAt: certificate.issuedAt,
    isPaid: certificate.course.price > 0,
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="certificate-${code}.pdf"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
