import { ImageResponse } from "next/og";

export const alt = "Ameen Academy — Professional Graphic Design Courses";
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
          background:
            "linear-gradient(135deg, #A002FF 0%, #6D01B0 50%, #3F0066 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            marginBottom: 36,
            border: "3px solid rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 72,
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
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Professional Graphic Design Courses
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
            marginTop: 48,
            padding: "16px 32px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>Pro Courses</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>Arabic Content</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>Certified</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}>Full Protection</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
