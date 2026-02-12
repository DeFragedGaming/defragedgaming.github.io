import React, { useState } from "react";

export default function DeviceNode({ device, engine, onSelectDevice }) {
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const rect = e.target.closest("div").getBoundingClientRect();
    const x = e.clientX - rect.left - 40;
    const y = e.clientY - rect.top - 20;

    engine.deviceManager.moveDevice(device.id, x, y);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={() => onSelectDevice(device)}
      style={{
        ...styles.node,
        left: device.x,
        top: device.y,
      }}
    >
      <div style={styles.icon}>📡</div>
      <div style={styles.label}>{device.name}</div>
    </div>
  );
}

const styles = {
  node: {
    position: "absolute",
    width: "80px",
    height: "60px",
    background: "#222",
    border: "1px solid #444",
    borderRadius: "6px",
    color: "#fff",
    cursor: "grab",
    userSelect: "none",
    textAlign: "center",
    paddingTop: "5px",
  },
  icon: {
    fontSize: "24px",
  },
  label: {
    fontSize: "12px",
    marginTop: "4px",
  },
};