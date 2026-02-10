import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CV Builder - Générateur de CV Intelligent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #5A252C 0%, #722F37 50%, #8B3A44 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "white",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
              fontSize: 48,
              fontWeight: 800,
              color: "#722F37",
            }}
          >
            D
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "white",
              letterSpacing: -2,
            }}
          >
            CV Builder
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Créez des CV professionnels avec l&apos;intelligence artificielle
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 32,
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.75)",
          }}
        >
          <span>Suggestions IA</span>
          <span>•</span>
          <span>Score ATS</span>
          <span>•</span>
          <span>Templates Pro</span>
        </div>
      </div>
    ),
    { ...size }
  );
}