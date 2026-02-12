import React, { useState, useEffect } from "react";
import Canvas from "../../engine/network-builder/canvas/Canvas";
import PanelWrapper from "../../engine/network-builder/panels/PanelWrapper";
import { createNetworkBuilderEngine } from "../../engine/network-builder/index";
import { ping, DeviceConfig } from "../../engine/network";

export default function NetworkBuilderApp() {
  const [engine] = useState(() => createNetworkBuilderEngine());
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [pingResult, setPingResult] = useState("");

  useEffect(() => {
    engine.state.reset();
  }, []);

  const handlePing = () => {
    const pc1 = engine.state.getDevice("pc1");
    const pc2 = engine.state.getDevice("pc2");

    const result = ping(pc1, pc2);
    setPingResult(result);
  };

  const handleConnectModeToggle = () => {
    window.dispatchEvent(
      new CustomEvent("cybertrace-canvas-mode", {
        detail: "toggle-connect-mode",
      })
    );
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.canvasArea}>
        <Canvas
          engine={engine}
          onSelectDevice={(device) => setSelectedDevice(device)}
        />
      </div>

      <div style={styles.panelArea}>
        <PanelWrapper device={selectedDevice} engine={engine} />

        <div style={{ marginTop: "20px" }}>
          <h3>Networking Test</h3>
          <button onClick={handlePing}>Ping PC1 → PC2</button>
          {pingResult && (
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              {pingResult}
            </p>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3>Topology Tools</h3>
          <button onClick={handleConnectModeToggle}>Connect Devices</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "80vh",
    width: "100%",
    border: "1px solid #333",
    background: "#1a1a1a",
  },
  canvasArea: {
    flex: 3,
    position: "relative",
  },
  panelArea: {
    flex: 1,
    background: "#111",
    borderLeft: "1px solid #333",
    color: "#fff",
    padding: "10px",
  },
};