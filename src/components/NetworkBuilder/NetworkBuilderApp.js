import React, { useState, useEffect } from "react";
import Canvas from "../../engine/network-builder/canvas/Canvas";
import PanelWrapper from "../../engine/network-builder/panels/PanelWrapper";

import { createNetworkBuilderEngine } from "../../engine/network-builder/index";

export default function NetworkBuilderApp() {
  const [engine] = useState(() => createNetworkBuilderEngine());
  const [selectedDevice, setSelectedDevice] = useState(null);

 
  useEffect(() => {
    engine.state.reset();
  }, [engine]);

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