import { useState, useEffect } from "react";

const W = 48;     // front face width (px)
const DX = 14;    // horizontal depth (px)
const DY = 10;    // vertical depth (px)
const MAX_H = 320; // tallest bar height (px)
const MIN_H = 20;  // shortest bar height (px)

const PALETTE = [
  { grad: ["#808092", "#6a6a7c"], side: "#3c3c50", top: "#9898b0" },
  { grad: ["#d8b45c", "#c8a448"], side: "#8a6e1e", top: "#e8c86a" },
  { grad: ["#e87272", "#d85e5e"], side: "#922c2c", top: "#f08888" },
  { grad: ["#7c78d8", "#6866c8"], side: "#3e3e9c", top: "#9090e8" },
  { grad: ["#4abac8", "#38a8b8"], side: "#1e7888", top: "#5ec8d8" },
  { grad: ["#4ac888", "#38b874"], side: "#1e7050", top: "#5ed898" },
  { grad: ["#e09050", "#d07840"], side: "#9a4818", top: "#e8a868" },
  { grad: ["#aa50d8", "#9838c8"], side: "#601898", top: "#c068e8" },
];

function colorForTeam(name) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) & 0xffff;
  return PALETTE[h % PALETTE.length];
}

function Bar3D({ barH, colors, changed }) {
  const cW = W + DX;
  const cH = barH + DY;
  return (
    <div className={`bar-3d${changed ? " bar-3d--flash" : ""}`} style={{ width: cW, height: cH }}>
      {/* Top face */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, width: cW, height: DY,
          background: colors.top,
          clipPath: `polygon(0 ${DY}px, ${W}px ${DY}px, ${cW}px 0, ${DX}px 0)`,
        }}
      />
      {/* Right side face */}
      <div
        style={{
          position: "absolute", top: 0, left: W, width: DX, height: cH,
          background: colors.side,
          clipPath: `polygon(0 ${DY}px, ${DX}px 0, ${DX}px ${barH}px, 0 ${cH}px)`,
        }}
      />
      {/* Front face */}
      <div
        style={{
          position: "absolute", top: DY, left: 0, width: W, height: barH,
          background: `linear-gradient(to right, ${colors.grad[0]}, ${colors.grad[1]})`,
          borderRadius: "2px 2px 0 0",
        }}
      />
    </div>
  );
}

const SKEL_HEIGHTS = [70, 110, 150, 195, 250, 320];

export default function BarChart({ rows, error, lastUpdated }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (rows.length > 0 && !ready) {
      requestAnimationFrame(() => setReady(true));
    }
  }, [rows.length, ready]);

  if (error) {
    return (
      <div className="chart-area">
        <div className="chart-error">⚠ {error}</div>
      </div>
    );
  }

  if (rows.length === 0 && lastUpdated) {
    return (
      <div className="chart-area">
        <div className="chart-empty">Add teams in the sheet please</div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="chart-area">
        <div className="bars-row bars-row--ready">
          {SKEL_HEIGHTS.map((h, i) => (
            <div key={i} className="bar-item">
              <div className="skel-score" />
              <div className="bar-3d bar-3d--skeleton" style={{ width: W + DX, height: h + DY }}>
                <div className="skel-face" style={{ position: "absolute", inset: 0 }} />
              </div>
              <div className="skel-label" />
            </div>
          ))}
        </div>
        <div className="chart-floor" />
      </div>
    );
  }

  const maxVal = Math.max(...rows.map((r) => r.value ?? 0), 1);
  const sorted = [...rows].sort((a, b) => (a.value ?? 0) - (b.value ?? 0));

  return (
    <div className="chart-area">
      <div className={`bars-row${ready ? " bars-row--ready" : ""}`}>
        {sorted.map((row, i) => {
          const barH = Math.max(MIN_H, Math.round(((row.value ?? 0) / maxVal) * MAX_H));
          const colors = colorForTeam(row.name ?? "");
          return (
            <div key={row.name ?? i} className="bar-item">
              <span className="bar-score">{row.value ?? "—"}</span>
              <div
                className={`bar-wrap${ready ? " bar-wrap--ready" : ""}`}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <Bar3D barH={barH} colors={colors} changed={row.changed} />
              </div>
              <span className="bar-label">{row.name}</span>
            </div>
          );
        })}
      </div>
      <div className="chart-floor" />
    </div>
  );
}
