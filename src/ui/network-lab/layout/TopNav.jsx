import React from "react";

export default function TopNav() {
  const tabs = [
    "Topology",
    "Configuration",
    "Routing",
    "Connectivity",
    "Validation"
  ];

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      padding: "12px 20px",
      backgroundColor: "#0f0f0f",
      borderBottom: "1px solid #1a1a1a",
      color: "#7fc7ff",
      fontFamily: "Consolas, monospace",
      fontSize: "14px",
      userSelect: "none"
    }}>
      {tabs.map((tab, i) => (
        <div key={i} style={{
          paddingBottom: "4px",
          cursor: "pointer",
          borderBottom: "2px solid transparent"
        }}>
          {tab}
        </div>
      ))}
    </div>
  );
}
