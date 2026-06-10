import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { readFile } from "fs/promises";
import { join } from "path";
import { rgb } from "pdf-lib";
import { drawShapedText, measureShapedText } from "./arabic-text";

// ============ توليد الشهادة ============
// التصميم نفسه صورة جاهزة (public/certificates) — بنكتب فوقها
// البيانات المتغيرة بس: اسم الطالب + تاريخ الإصدار + كود الشهادة.

// أبعاد التيمبلت 1448×1086 — صفحة الـ PDF بنفس النسبة عشان مفيش تمدد
const PAGE_WIDTH = 842;
const PAGE_HEIGHT = Math.round((842 * 1086) / 1448); // ≈ 631

// لون اسم الطالب — نفس الدهبي بتاع التصميم
const NAME_COLOR = rgb(178 / 255, 142 / 255, 78 / 255);
// لون التاريخ والكود — رمادي غامق هادي
const META_COLOR = rgb(70 / 255, 70 / 255, 95 / 255);

// أماكن الكتابة كنِسَب من أبعاد الصفحة (متظبطة على التصميمين)
const LAYOUT = {
  free: {
    nameCenterY: 0.415, // مركز صندوق الاسم من فوق
    dateX: 0.215, // بداية قيمة التاريخ (تحت ISSUED ON)
    codeX: 0.373, // بداية قيمة الكود (تحت CERTIFICATE ID)
    metaY: 0.795, // سطر القيم تحت الليبلات
  },
  paid: {
    nameCenterY: 0.468,
    dateX: 0.21,
    codeX: 0.365,
    metaY: 0.788,
  },
} as const;

export async function generateCertificatePDF({
  studentName,
  certificateCode,
  issuedAt,
  isPaid,
}: {
  studentName: string;
  certificateCode: string;
  issuedAt: Date;
  isPaid: boolean;
}) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const template = isPaid ? "template-paid.png" : "template-free.png";
  const layout = LAYOUT[isPaid ? "paid" : "free"];

  const [templateBytes, boldFontBytes, regularFontBytes] = await Promise.all([
    readFile(join(process.cwd(), "public/certificates", template)),
    readFile(join(process.cwd(), "public/fonts/IBMPlexSansArabic-Bold.ttf")),
    readFile(join(process.cwd(), "public/fonts/IBMPlexSansArabic-Regular.ttf")),
  ]);

  // الاسم بيترسم كـ vector paths عبر fontkit (وصل الحروف العربية صح) —
  // الخط الـ embedded بيستخدم للتاريخ والكود اللاتيني بس
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nameFont = (fontkit as any).create(boldFontBytes);
  const regularFont = await pdfDoc.embedFont(regularFontBytes, { subset: true });
  const templateImage = await pdfDoc.embedPng(templateBytes);

  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page.drawImage(templateImage, { x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT });

  // === اسم الطالب — في نص الصندوق المزخرف ===
  // الحجم بيصغر مع الأسماء الطويلة عشان ميخرجش من الإطار
  const name = studentName.trim();
  let nameSize = 34;
  let nameWidth = measureShapedText(nameFont, name, nameSize);
  const maxNameWidth = PAGE_WIDTH * 0.42;
  while (nameWidth > maxNameWidth && nameSize > 16) {
    nameSize -= 2;
    nameWidth = measureShapedText(nameFont, name, nameSize);
  }
  drawShapedText(page, nameFont, name, {
    x: (PAGE_WIDTH - nameWidth) / 2,
    y: PAGE_HEIGHT * (1 - layout.nameCenterY) - nameSize / 3,
    size: nameSize,
    color: NAME_COLOR,
  });

  // === التاريخ — تحت ISSUED ON ===
  const dateStr = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(issuedAt);
  page.drawText(dateStr, {
    x: PAGE_WIDTH * layout.dateX,
    y: PAGE_HEIGHT * (1 - layout.metaY),
    size: 10,
    font: regularFont,
    color: META_COLOR,
  });

  // === كود الشهادة — تحت CERTIFICATE ID ===
  page.drawText(certificateCode, {
    x: PAGE_WIDTH * layout.codeX,
    y: PAGE_HEIGHT * (1 - layout.metaY),
    size: 10,
    font: regularFont,
    color: META_COLOR,
  });

  return await pdfDoc.save();
}
