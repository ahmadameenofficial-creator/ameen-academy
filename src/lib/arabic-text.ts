import type { PDFPage, RGB } from "pdf-lib";

// ============ رسم نص عربي صحيح في pdf-lib ============
// pdf-lib مش بيطبّق وصل الحروف العربية وبيطلّع الاسم مكسّر.
// الحل الجذري: fontkit بيعمل التشكيل الصح (layout)، وإحنا بنرسم
// الحروف نفسها كـ vector paths — زي ما برامج التصميم بتصدّر النصوص.

interface FontkitGlyph {
  path: { commands: { command: string; args: number[] }[] };
}

interface FontkitFont {
  unitsPerEm: number;
  layout(text: string): {
    glyphs: FontkitGlyph[];
    positions: { xAdvance: number; xOffset: number; yOffset: number }[];
  };
}

const hasArabic = (text: string) => /[؀-ۿ]/.test(text);

/** تحويل مسار الحرف لـ SVG path مع قلب محور Y (الخطوط Y لفوق والـ SVG لتحت) */
function glyphToSvgPath(glyph: FontkitGlyph): string {
  const parts: string[] = [];
  for (const { command, args } of glyph.path.commands) {
    switch (command) {
      case "moveTo":
        parts.push(`M ${args[0]} ${-args[1]}`);
        break;
      case "lineTo":
        parts.push(`L ${args[0]} ${-args[1]}`);
        break;
      case "quadraticCurveTo":
        parts.push(`Q ${args[0]} ${-args[1]} ${args[2]} ${-args[3]}`);
        break;
      case "bezierCurveTo":
        parts.push(
          `C ${args[0]} ${-args[1]} ${args[2]} ${-args[3]} ${args[4]} ${-args[5]}`,
        );
        break;
      case "closePath":
        parts.push("Z");
        break;
    }
  }
  return parts.join(" ");
}

// النص بيتقسم مقاطع: عربي vs لاتيني — الترتيب البصري بيعكس المقاطع،
// والحروف العربية بتترسم من آخر glyph لأوله (يمين-لشمال)
function segmentRuns(text: string): { text: string; rtl: boolean }[] {
  const raw = text.match(/[؀-ۿ\s]+|[^؀-ۿ]+/g) || [text];
  const runs = raw.map((seg) => ({ text: seg, rtl: hasArabic(seg) }));
  return runs.reverse();
}

/** عرض النص بوحدات الـ PDF — للتوسيط واختيار حجم الخط */
export function measureShapedText(font: FontkitFont, text: string, size: number): number {
  const scale = size / font.unitsPerEm;
  let width = 0;
  for (const run of segmentRuns(text)) {
    const { positions } = font.layout(run.text);
    for (const pos of positions) width += pos.xAdvance * scale;
  }
  return width;
}

/** رسم النص المُشكّل عند نقطة بداية (x = أقصى الشمال، y = الـ baseline) */
export function drawShapedText(
  page: PDFPage,
  font: FontkitFont,
  text: string,
  options: { x: number; y: number; size: number; color: RGB },
) {
  const scale = options.size / font.unitsPerEm;
  let penX = options.x;

  for (const run of segmentRuns(text)) {
    const { glyphs, positions } = font.layout(run.text);
    // fontkit بيرجّع حروف العربي بالترتيب البصري جاهز (يمين-لشمال) —
    // بنرسم بالترتيب زي ما هو، وعكسه تاني بيبوّظ الاسم
    for (let i = 0; i < glyphs.length; i++) {
      const d = glyphToSvgPath(glyphs[i]);
      if (d) {
        page.drawSvgPath(d, {
          x: penX + positions[i].xOffset * scale,
          y: options.y + positions[i].yOffset * scale,
          scale,
          color: options.color,
          borderWidth: 0,
        });
      }
      penX += positions[i].xAdvance * scale;
    }
  }
}
