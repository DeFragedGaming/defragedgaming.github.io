import React from "react";
import TopNav from "./layout/TopNav";
import LeftPanel from "./panels/LeftPanel";
import Canvas from "./canvas/Canvas";

export default function NetworkLab() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#0b0b0b",
        color: "#e5e5e5",
        fontFamily: "Consolas, monospace",
        overflow: "hidden"
      }}
    >
      <TopNav />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <LeftPanel />
        <Canvas />

        <div
          style={{
            width: "300px",
            backgroundColor: "#111",
            borderLeft: "1px solid #1e1e1e",
            padding: "12px",
            overflowY: "auto"
          }}
        >
          <h2
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              color: "#7fc7ff",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
          >
            Device Config
          </h2>
          <div style={{ opacity: 0.6 }}>Configuration panel coming soon…</div>
        </div>
      </div>

      <div
        style={{
          height: "160px",
          backgroundColor: "#0f0f0f",
          borderTop: "1px solid #1e1e1e",
          padding: "12px",
          overflowY: "auto"
        }}
      >
        <h2
          style={{
            fontSize: "14px",
            marginBottom: "10px",
            color: "#7fc7ff",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          Terminal / Logs
        </h2>
        <div style={{ opacity: 0.6 }}>Terminal output coming soon…</div>
      </div>
    </div>
  );
}
