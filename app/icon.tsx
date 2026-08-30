import { ImageResponse } from "next/og";

// Preferred favicon: /public/favicon.svg (from /brand/logo/logo-icon.svg)
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E0E10",
          borderRadius: "6px",
          fontSize: 18,
          fontWeight: 700,
          color: "#006699",
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}
