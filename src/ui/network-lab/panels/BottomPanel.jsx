import React, { useState } from "react";

export default function BottomPanel({ logs, onCommand }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput("");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "220px",
        background: "#0f172a",
        borderTop: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem",
          color: "#38bdf8",
          fontFamily: "monospace",
          fontSize: "0.9rem",
          whiteSpace: "pre-wrap"
        }}
      >
        {logs.length === 0 && (
          <div style={{ color: "#475569" }}>Terminal ready.</div>
        )}
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          borderTop: "1px solid #1f2937",
          padding: "0.5rem",
          display: "flex",
          gap: "0.5rem"
        }}
      >
        <span
          style={{
            color: "#38bdf8",
            fontFamily: "monospace",
            paddingTop: "0.35rem"
          }}
        >
          $
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#e5e7eb",
            padding: "0.5rem",
            fontFamily: "monospace"
          }}
        />
      </form>
    </div>
  );
}
