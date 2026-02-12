import React, { useState } from "react";
import DeviceNode from "./DeviceNode";

export default function Canvas({ engine, onSelectDevice }) {
  const devices = engine.deviceManager.getDevices();

  return (
    <div style={styles.canvas}>
      {devices.map((device) => (
        <DeviceNode
          key={device.id}
          device={device}
          engine={engine}
          onSelectDevice={onSelectDevice}
        />
      ))}
    </div>
  );
}

const styles = {
  canvas: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    background: "#0d0d0d",
  },
};