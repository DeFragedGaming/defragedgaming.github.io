import React from "react";

export default function RightPanel({ selectedDevice, onUpdate }) {
  if (!selectedDevice) {
    return (
      <div
        style={{
          width: "320px",
          height: "100%",
          background: "#0f172a",
          borderLeft: "1px solid #1f2937",
          padding: "1rem",
          color: "#94a3b8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        No device selected
      </div>
    );
  }

  const updateField = (field, value) => {
    onUpdate({
      ...selectedDevice,
      [field]: value
    });
  };

  return (
    <div
      style={{
        width: "320px",
        height: "100%",
        background: "#0f172a",
        borderLeft: "1px solid #1f2937",
        padding: "1rem",
        overflowY: "auto"
      }}
    >
      <h2 style={{ color: "#e5e7eb", marginBottom: "1rem" }}>
        {selectedDevice.hostname}
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Hostname</label>
        <input
          type="text"
          value={selectedDevice.hostname}
          onChange={(e) => updateField("hostname", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#e5e7eb",
            marginTop: "0.25rem"
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>IP Address</label>
        <input
          type="text"
          value={selectedDevice.ip}
          onChange={(e) => updateField("ip", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#e5e7eb",
            marginTop: "0.25rem"
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Subnet Mask</label>
        <input
          type="text"
          value={selectedDevice.subnet}
          onChange={(e) => updateField("subnet", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#e5e7eb",
            marginTop: "0.25rem"
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Gateway</label>
        <input
          type="text"
          value={selectedDevice.gateway}
          onChange={(e) => updateField("gateway", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#e5e7eb",
            marginTop: "0.25rem"
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>MAC Address</label>
        <input
          type="text"
          value={selectedDevice.mac}
          onChange={(e) => updateField("mac", e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            background: "#1e293b",
            border: "1px solid #334155",
            color: "#e5e7eb",
            marginTop: "0.25rem"
          }}
        />
      </div>
    </div>
  );
}
