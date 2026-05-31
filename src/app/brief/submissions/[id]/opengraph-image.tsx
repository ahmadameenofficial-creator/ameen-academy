import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/prisma";
import { BRIEF_TYPE_LABELS } from "@/lib/brief/constants";

export const alt = "حل تصميم — منصة البريف";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadLogo(): Promise<string | null> {
  try {
    const data = await readFile(join(process.cwd(), "public/images/academy-logo.png"));
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

async function loadArabicFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans-arabic@5/files/ibm-plex-sans-arabic-arabic-700-normal.woff",
      { cache: "force-cache" },
    );
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

const BG = "linear-gradient(135deg, #A002FF 0%, #6D01B0 50%, #3F0066 100%)";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ameen.academy";

// نحمّل صورة الحل ونحوّلها Data URI — Satori مايقدرش يجيب مسار نسبي،
// ولازم URL مطلق. لو فشل التحميل بنرجّع null ونرسم بدون الصورة.
async function loadSubmissionImage(imageUrl: string): Promise<string | null> {
  try {
    const absolute = imageUrl.startsWith("http") ? imageUrl : `${BASE_URL}${imageUrl}`;
    const res = await fetch(absolute, { signal: AbortSignal.timeout(15000), cache: "force-cache" });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "image/png";
    if (!type.startsWith("image/")) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength > 8 * 1024 * 1024) return null; // سقف أمان
    return `data:${type};base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    return null;
  }
}

function fallbackImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, color: "white" }}>Ameen Academy</div>
      </div>
    ),
    { ...size },
  );
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const [sub, font, logo] = await Promise.all([
      prisma.briefSubmission.findUnique({
        where: { id },
        select: {
          imageUrl: true,
          status: true,
          user: { select: { name: true } },
          brief: { select: { title: true, type: true } },
        },
      }),
      loadArabicFont(),
      loadLogo(),
    ]);

    if (!sub || sub.status !== "PUBLISHED" || !font) return fallbackImage();

    const solutionImage = await loadSubmissionImage(sub.imageUrl);

    return new ImageResponse(
      (
        <div style={{ height: "100%", width: "100%", display: "flex", background: BG, fontFamily: "IBMArabic" }}>
          {/* صورة الحل — تملأ الجهة اليسرى */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 680,
              height: "100%",
              position: "relative",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            {solutionImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={solutionImage}
                alt="حل"
                width={680}
                height={630}
                style={{ width: 680, height: 630, objectFit: "cover" }}
              />
            ) : (
              <div style={{ display: "flex", fontSize: 38, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
                حل تصميم
              </div>
            )}
            {/* watermark شفاف فوق الصورة */}
            <div
              style={{
                position: "absolute",
                bottom: 18,
                left: 18,
                display: "flex",
                alignItems: "center",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.45)",
                color: "white",
                fontSize: 22,
              }}
            >
              ameen.academy/brief
            </div>
          </div>

          {/* لوحة العلامة التجارية */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "56px 50px",
              direction: "rtl",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="أكاديمية أمين" width={88} height={60} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    fontSize: 32,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  A
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: "white" }}>أكاديمية أمين</div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.75)" }}>منصة البريف</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  padding: "8px 22px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.16)",
                  color: "white",
                  fontSize: 24,
                }}
              >
                {BRIEF_TYPE_LABELS[sub.brief.type]}
              </div>
              <div style={{ display: "flex", fontSize: 42, fontWeight: 700, color: "white", lineHeight: 1.3 }}>
                {sub.brief.title}
              </div>
            </div>

            <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
              حل بواسطة {sub.user.name ?? "مصمم"}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [{ name: "IBMArabic", data: font, weight: 700, style: "normal" }],
      },
    );
  } catch {
    return fallbackImage();
  }
}
