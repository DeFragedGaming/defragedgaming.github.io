import React from "react";

export default function Canvas() {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#0d0d0d",
        padding: "12px",
        borderLeft: "1px solid #00000020",
        borderRight: "1px solid #00000020",
        overflow: "auto",
        color: "#e5e5e5",
        fontFamily: "Consolas, monospace"
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
        Canvas Area
      </h2>

      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "600px",
          backgroundColor: "#0a0a0a",
          border: "1px solid #1e1e1e",
          borderRadius: "6px",
          position: "relative"
        }}
      >
      </div>
    </div>
  );
}
