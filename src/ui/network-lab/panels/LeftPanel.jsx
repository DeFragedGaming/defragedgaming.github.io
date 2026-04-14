import React from "react";

export default function LeftPanel() {
  const deviceCategories = [
    {
      title: "Routers",
      items: ["Cisco", "Juniper", "MikroTik", "VyOS", "Fortinet", "Ubiquiti"]
    },
    {
      title: "Switches",
      items: ["Layer 2 Switch", "Layer 3 Switch"]
    },
    {
      title: "Hosts",
      items: ["PC", "Server", "Printer", "VoIP Phone"]
    },
    {
      title: "Tools",
      items: ["Cable", "Delete", "Inspect"]
    }
  ];

  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#111",
        borderRight: "1px solid #1e1e1e",
        padding: "12px",
        overflowY: "auto",
        color: "#e5e5e5",
        fontFamily: "Consolas, monospace"
      }}
    >
      <h2
        style={{
          fontSize: "14px",
          marginBottom: "12px",
          color: "#7fc7ff",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}
      >
        Devices / Tools
      </h2>

      {deviceCategories.map((cat, idx) => (
        <div key={idx} style={{ marginBottom: "18px" }}>
          <div
            style={{
              fontSize: "13px",
              marginBottom: "6px",
              color: "#5aa9ff",
              fontWeight: "bold"
            }}
          >
            {cat.title}
          </div>

          {cat.items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "6px 8px",
                marginBottom: "4px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #222",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#222")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a1a1a")
              }
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
