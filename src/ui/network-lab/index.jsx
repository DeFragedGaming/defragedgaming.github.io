import React from "react";
import TopNav from "./layout/TopNav";
import LeftPanel from "./panels/LeftPanel";

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

        
        <div
          style={{
            flex: 1,
            backgroundColor: "#0d0d0d",
            padding: "12px",
            borderLeft: "1px solid #00000020",
            borderRight: "1px solid #00000020",
            overflow: "auto"
          }}
        >
          <h2 style={{ fontSize: "14px", marginBottom: "10px", color: "#7fc7ff" }}>
            Canvas Area
          </h2>
          <div style={{ opacity: 0.6 }}>Network canvas coming soon…</div>
        </div>

        
        <div
          style={{
            width: "300px",
            backgroundColor: "#111",
            borderLeft: "1px solid #1e1e1e",
            padding: "12px",
            overflowY: "auto"
          }}
        >
          <h2 style={{ fontSize: "14px", marginBottom: "10px", color: "#7fc7ff" }}>
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
        <h2 style={{ fontSize: "14px", marginBottom: "10px", color: "#7fc7ff" }}>
          Terminal / Logs
        </h2>
        <div style={{ opacity: 0.6 }}>Terminal output coming soon…</div>
      </div>
    </div>
  );
}
