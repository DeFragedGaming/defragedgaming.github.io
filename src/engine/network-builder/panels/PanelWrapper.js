import React from "react";

export default function PanelWrapper({ device }) {
  if (!device) {
    return <div>Select a device to configure it.</div>;
  }

  return (
    <div>
      <h3>{device.name}</h3>
      <p>Type: {device.type}</p>
      <p>ID: {device.id}</p>

      <div style={{ marginTop: "10px", opacity: 0.6 }}>
        (Full configuration panels coming next)
      </div>
    </div>
  );
}