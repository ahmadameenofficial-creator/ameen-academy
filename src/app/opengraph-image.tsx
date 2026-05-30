import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "أكاديمية أمين — تعلّم المهارات اللي تجيبلك فلوس";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG =
  "linear-gradient(135deg, #A002FF 0%, #6D01B0 50%, #3F0066 100%)";

// نحمّل خط عربي (WOFF — Satori بيدعمه) من CDN ثابت.
// لو فشل التحميل بنرجّع null ونستخدم الصورة الاحتياطية الإنجليزية المضمونة.
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
          Design · AI · Freelance
        </div>
      </div>
    ),
    { ...size },
  );
}

export default async function Image() {
  try {
    const [font, logo] = await Promise.all([loadArabicFont(), loadLogo()]);

    // لو الخط مش متاح → الصورة الاحتياطية المضمونة
    if (!font) return fallbackImage();

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
            fontFamily: "IBMArabic",
          }}
        >
          {/* اللوجو */}
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt="أكاديمية أمين"
              width={210}
              height={144}
              style={{ marginBottom: 28 }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                marginBottom: 32,
                border: "3px solid rgba(255,255,255,0.2)",
                fontSize: 72,
                fontWeight: 700,
                color: "white",
              }}
            >
              A
            </div>
          )}

          {/* العنوان */}
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.2,
              direction: "rtl",
            }}
          >
            أكاديمية أمين
          </div>

          {/* الوصف */}
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "rgba(255,255,255,0.85)",
              marginTop: 16,
              textAlign: "center",
              direction: "rtl",
            }}
          >
            تعلّم المهارات اللي تجيبلك فلوس
          </div>

          {/* الشريط السفلي */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              marginTop: 44,
              padding: "16px 34px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              direction: "rtl",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 22 }}>
              تصميم
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>•</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 22 }}>
              ذكاء اصطناعي
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>•</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 22 }}>
              فريلانس
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>•</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 22 }}>
              شهادة إتمام
            </span>
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
