import React, { useState, useEffect } from "react";

export default function DeviceConfigPanel({ device, engine }) {
  const [form, setForm] = useState({
    name: "",
    ip: "",
    subnetMask: "",
    gateway: "",
    mac: "",
  });

  useEffect(() => {
    if (device) {
      setForm({
        name: device.name || "",
        ip: device.ip || "",
        subnetMask: device.subnetMask || "",
        gateway: device.gateway || "",
        mac: device.mac || "",
      });
    }
  }, [device]);

  if (!device) {
    return <p style={{ color: "#aaa" }}>Select a device to configure it.</p>;
  }

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    engine.deviceManager.updateDevice(device.id, {
      ...device,
      [field]: value,
    });
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  };

  const labelStyle = {
    marginBottom: "4px",
    fontSize: "14px",
    color: "#ccc",
  };

  const inputStyle = {
    padding: "6px 8px",
    background: "#222",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3 style={{ marginBottom: "15px" }}>Device Configuration</h3>

      <div style={fieldStyle}>
        <label style={labelStyle}>Hostname</label>
        <input
          style={inputStyle}
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>IP Address</label>
        <input
          style={inputStyle}
          value={form.ip}
          onChange={(e) => updateField("ip", e.target.value)}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Subnet Mask</label>
        <input
          style={inputStyle}
          value={form.subnetMask}
          onChange={(e) => updateField("subnetMask", e.target.value)}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Gateway</label>
        <input
          style={inputStyle}
          value={form.gateway}
          onChange={(e) => updateField("gateway", e.target.value)}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>MAC Address</label>
        <input
          style={inputStyle}
          value={form.mac}
          onChange={(e) => updateField("mac", e.target.value)}
        />
      </div>
    </div>
  );
}