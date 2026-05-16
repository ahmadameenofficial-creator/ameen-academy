import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { readFile } from "fs/promises";
import { join } from "path";

const BRAND_COLOR = rgb(160 / 255, 2 / 255, 255 / 255);
const DARK_COLOR = rgb(26 / 255, 26 / 255, 46 / 255);
const GRAY_COLOR = rgb(120 / 255, 120 / 255, 140 / 255);
const GOLD_COLOR = rgb(212 / 255, 175 / 255, 55 / 255);
const WHITE = rgb(1, 1, 1);
const LIGHT_BG = rgb(250 / 255, 249 / 255, 255 / 255);

export async function generateCertificatePDF({
  studentName,
  courseName,
  certificateCode,
  issuedAt,
}: {
  studentName: string;
  courseName: string;
  certificateCode: string;
  issuedAt: Date;
}) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const boldFontBytes = await readFile(
    join(process.cwd(), "public/fonts/IBMPlexSansArabic-Bold.ttf")
  );
  const regularFontBytes = await readFile(
    join(process.cwd(), "public/fonts/IBMPlexSansArabic-Regular.ttf")
  );

  const boldFont = await pdfDoc.embedFont(boldFontBytes, { subset: true });
  const regularFont = await pdfDoc.embedFont(regularFontBytes, { subset: true });
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // A4 Landscape
  const width = 842;
  const height = 595;
  const page = pdfDoc.addPage([width, height]);

  // === Background ===
  page.drawRectangle({ x: 0, y: 0, width, height, color: LIGHT_BG });

  // === Outer border ===
  const borderMargin = 25;
  page.drawRectangle({
    x: borderMargin,
    y: borderMargin,
    width: width - borderMargin * 2,
    height: height - borderMargin * 2,
    borderColor: BRAND_COLOR,
    borderWidth: 2,
    opacity: 0,
  });

  // === Inner border ===
  const innerMargin = 35;
  page.drawRectangle({
    x: innerMargin,
    y: innerMargin,
    width: width - innerMargin * 2,
    height: height - innerMargin * 2,
    borderColor: GOLD_COLOR,
    borderWidth: 1,
    opacity: 0,
  });

  // === Corner decorations ===
  const corners = [
    { x: 30, y: 30 },
    { x: width - 30, y: 30 },
    { x: 30, y: height - 30 },
    { x: width - 30, y: height - 30 },
  ];
  for (const c of corners) {
    page.drawCircle({ x: c.x, y: c.y, size: 6, color: BRAND_COLOR });
    page.drawCircle({ x: c.x, y: c.y, size: 3, color: GOLD_COLOR });
  }

  // === Top accent line ===
  page.drawRectangle({
    x: width / 2 - 100,
    y: height - 65,
    width: 200,
    height: 3,
    color: BRAND_COLOR,
  });

  // === Academy Name (top) ===
  const academyText = "أكاديمية أمين";
  const academyWidth = boldFont.widthOfTextAtSize(academyText, 22);
  page.drawText(academyText, {
    x: (width - academyWidth) / 2,
    y: height - 95,
    size: 22,
    font: boldFont,
    color: BRAND_COLOR,
  });

  // === Certificate Title ===
  const titleText = "شهادة إتمام";
  const titleWidth = boldFont.widthOfTextAtSize(titleText, 36);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y: height - 155,
    size: 36,
    font: boldFont,
    color: DARK_COLOR,
  });

  // === "CERTIFICATE OF COMPLETION" in English ===
  const engTitle = "CERTIFICATE OF COMPLETION";
  const engWidth = helvetica.widthOfTextAtSize(engTitle, 10);
  page.drawText(engTitle, {
    x: (width - engWidth) / 2,
    y: height - 175,
    size: 10,
    font: helvetica,
    color: GRAY_COLOR,
  });

  // === Decorative line under title ===
  page.drawRectangle({
    x: width / 2 - 60,
    y: height - 195,
    width: 120,
    height: 2,
    color: GOLD_COLOR,
  });

  // === "This certifies that" ===
  const certifiesText = "تشهد أكاديمية أمين بأن";
  const certifiesWidth = regularFont.widthOfTextAtSize(certifiesText, 14);
  page.drawText(certifiesText, {
    x: (width - certifiesWidth) / 2,
    y: height - 230,
    size: 14,
    font: regularFont,
    color: GRAY_COLOR,
  });

  // === Student Name ===
  const nameSize = studentName.length > 20 ? 28 : 34;
  const nameWidth = boldFont.widthOfTextAtSize(studentName, nameSize);
  page.drawText(studentName, {
    x: (width - nameWidth) / 2,
    y: height - 275,
    size: nameSize,
    font: boldFont,
    color: BRAND_COLOR,
  });

  // === Line under name ===
  const lineWidth = Math.max(nameWidth + 40, 300);
  page.drawRectangle({
    x: (width - lineWidth) / 2,
    y: height - 290,
    width: lineWidth,
    height: 1,
    color: GOLD_COLOR,
  });

  // === "has successfully completed" ===
  const completedText = "قد أتم بنجاح دراسة كورس";
  const completedWidth = regularFont.widthOfTextAtSize(completedText, 14);
  page.drawText(completedText, {
    x: (width - completedWidth) / 2,
    y: height - 320,
    size: 14,
    font: regularFont,
    color: GRAY_COLOR,
  });

  // === Course Name ===
  const courseSize = courseName.length > 30 ? 18 : 22;
  const courseWidth = boldFont.widthOfTextAtSize(courseName, courseSize);
  page.drawText(courseName, {
    x: (width - courseWidth) / 2,
    y: height - 355,
    size: courseSize,
    font: boldFont,
    color: DARK_COLOR,
  });

  // === Date ===
  const dateStr = new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(issuedAt);
  const dateLabel = `تاريخ الإصدار: ${dateStr}`;
  const dateWidth = regularFont.widthOfTextAtSize(dateLabel, 12);
  page.drawText(dateLabel, {
    x: (width - dateWidth) / 2,
    y: height - 400,
    size: 12,
    font: regularFont,
    color: GRAY_COLOR,
  });

  // === Signature area ===
  // Left: Director
  page.drawRectangle({
    x: width / 2 - 280,
    y: height - 470,
    width: 160,
    height: 1,
    color: DARK_COLOR,
  });
  const directorText = "أحمد أمين";
  const directorWidth = boldFont.widthOfTextAtSize(directorText, 14);
  page.drawText(directorText, {
    x: width / 2 - 280 + (160 - directorWidth) / 2,
    y: height - 490,
    size: 14,
    font: boldFont,
    color: DARK_COLOR,
  });
  const dirRoleText = "مؤسس الأكاديمية";
  const dirRoleWidth = regularFont.widthOfTextAtSize(dirRoleText, 10);
  page.drawText(dirRoleText, {
    x: width / 2 - 280 + (160 - dirRoleWidth) / 2,
    y: height - 508,
    size: 10,
    font: regularFont,
    color: GRAY_COLOR,
  });

  // Right: Academy
  page.drawRectangle({
    x: width / 2 + 120,
    y: height - 470,
    width: 160,
    height: 1,
    color: DARK_COLOR,
  });
  const stampText = "أكاديمية أمين";
  const stampWidth = boldFont.widthOfTextAtSize(stampText, 14);
  page.drawText(stampText, {
    x: width / 2 + 120 + (160 - stampWidth) / 2,
    y: height - 490,
    size: 14,
    font: boldFont,
    color: DARK_COLOR,
  });
  const stampRoleText = "الختم الرسمي";
  const stampRoleWidth = regularFont.widthOfTextAtSize(stampRoleText, 10);
  page.drawText(stampRoleText, {
    x: width / 2 + 120 + (160 - stampRoleWidth) / 2,
    y: height - 508,
    size: 10,
    font: regularFont,
    color: GRAY_COLOR,
  });

  // === Bottom accent line ===
  page.drawRectangle({
    x: width / 2 - 100,
    y: 60,
    width: 200,
    height: 3,
    color: BRAND_COLOR,
  });

  // === Certificate Code ===
  const codeText = `Certificate Code: ${certificateCode}`;
  const codeWidth = helvetica.widthOfTextAtSize(codeText, 9);
  page.drawText(codeText, {
    x: (width - codeWidth) / 2,
    y: 42,
    size: 9,
    font: helvetica,
    color: GRAY_COLOR,
  });

  return await pdfDoc.save();
}
