import { ImageResponse } from "next/og";

export const alt = "Kabel und Garn – Stickerei Augsburg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
            background: "#0E0E10",
            color: "#FFFFFF",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            marginBottom: 16,
            color: "#FFFFFF",
          }}
        >
          Kabel und Garn
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#006699",
          }}
        >
          Stickerei & Textilveredelung · Augsburg
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: "60%",
            height: 4,
            background: "rgba(0, 102, 153, 0.4)",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
