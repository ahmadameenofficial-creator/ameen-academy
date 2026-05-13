import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "أكاديمية أمين — تعلّم صح";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #A002FF 0%, #6D01B0 50%, #3F0066 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "white",
            }}
          >
            A
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Ameen Academy
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.8)",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          أكاديمية أمين — تعلّم صح
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 48,
            color: "rgba(255,255,255,0.6)",
            fontSize: 20,
          }}
        >
          <span>كورسات احترافية</span>
          <span>•</span>
          <span>محتوى عربي</span>
          <span>•</span>
          <span>حماية كاملة</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
