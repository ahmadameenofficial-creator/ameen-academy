import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/prisma";

export const alt = "مقال — أكاديمية أمين";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// نحمّل اللوجو من public ونحوّله Data URI عشان Satori يقدر يرسمه.
async function loadLogo(): Promise<string | null> {
  try {
    const data = await readFile(
      join(process.cwd(), "public/images/academy-logo.png"),
    );
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

// نحمّل خط عربي (WOFF — Satori بيدعمه) من CDN ثابت.
// لو فشل التحميل لأي سبب، بنرجّع null ونستخدم صورة احتياطية مضمونة.
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

const BG =
  "linear-gradient(135deg, #A002FF 0%, #6D01B0 50%, #3F0066 100%)";

// صورة احتياطية بالإنجليزي فقط — بتشتغل بالخط الافتراضي من غير أي اعتماد خارجي
function fallbackImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, color: "white" }}>
          Ameen Academy
        </div>
        <div
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.85)",
            marginTop: 16,
          }}
        >
          Blog — Design · AI · Freelance
        </div>
      </div>
    ),
    { ...size },
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug: raw } = await params;
    const slug = decodeURIComponent(raw);

    const [post, font, logo] = await Promise.all([
      prisma.blogPost.findUnique({
        where: { slug },
        select: { title: true, category: true },
      }),
      loadArabicFont(),
      loadLogo(),
    ]);

    // لو مفيش مقال أو الخط مش متاح → الصورة الاحتياطية المضمونة
    if (!post || !font) return fallbackImage();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: BG,
            padding: "70px 80px",
            fontFamily: "IBMArabic",
          }}
        >
          {/* الترويسة */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              direction: "rtl",
            }}
          >
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="أكاديمية أمين" width={105} height={72} />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "3px solid rgba(255,255,255,0.25)",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                A
              </div>
            )}
            <div style={{ fontSize: 34, fontWeight: 700, color: "white" }}>
              أكاديمية أمين
            </div>
          </div>

          {/* العنوان */}
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.35,
              textAlign: "right",
              direction: "rtl",
            }}
          >
            {post.title}
          </div>

          {/* التذييل */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              direction: "rtl",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px 26px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                color: "white",
                fontSize: 26,
              }}
            >
              {post.category}
            </div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
              ameen.academy
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
    // أي خطأ غير متوقع → صورة احتياطية بدل ما الراوت يقع
    return fallbackImage();
  }
}
