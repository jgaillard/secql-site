import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  let fontData: ArrayBuffer;
  try {
    const fontPath = join(
      process.cwd(),
      "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf"
    );
    const buf = await readFile(fontPath);
    fontData = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  } catch {
    // Fallback: use without custom font
    return new ImageResponse(
      <OGContent />,
      { ...size }
    );
  }

  return new ImageResponse(<OGContent />, {
    ...size,
    fonts: [
      {
        name: "Geist",
        data: fontData,
        style: "normal",
        weight: 700,
      },
    ],
  });
}

function OGContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#09090b",
        color: "#fafafa",
        fontFamily: "Geist, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#34d399",
          }}
        />
        <span style={{ fontSize: "20px", color: "#a1a1aa", fontFamily: "monospace" }}>
          pip install secql
        </span>
      </div>

      <div style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.1, marginBottom: "16px", display: "flex", flexDirection: "column" }}>
        <span>Clean SEC data.</span>
        <span style={{ color: "#a1a1aa" }}>Excellent DX.</span>
      </div>

      <div style={{ fontSize: "24px", color: "#a1a1aa", marginBottom: "48px", display: "flex" }}>
        REST API + Python SDK for SEC EDGAR financial data
      </div>

      <div
        style={{
          display: "flex",
          gap: "32px",
          fontSize: "18px",
          color: "#71717a",
        }}
      >
        <span>8,000+ companies</span>
        <span style={{ color: "#3f3f46" }}>|</span>
        <span>15+ years of history</span>
        <span style={{ color: "#3f3f46" }}>|</span>
        <span>From $0/month</span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "80px",
          fontSize: "20px",
          color: "#52525b",
          fontFamily: "monospace",
          display: "flex",
        }}
      >
        secql.dev
      </div>
    </div>
  );
}
