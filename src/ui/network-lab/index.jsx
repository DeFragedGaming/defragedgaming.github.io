import React, { useState } from "react";
import TopNav from "./layout/TopNav";
import LeftPanel from "./panels/LeftPanel";
import RightPanel from "./panels/RightPanel";
import Canvas from "./canvas/Canvas";
import BottomPanel from "./panels/BottomPanel";

export default function NetworkLab() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (text) => {
    setLogs((prev) => [...prev, text]);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    addLog(`Selected device: ${device.hostname}`);
  };

  const handleDeviceUpdate = (updated) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
    setSelectedDevice(updated);
    addLog(`Updated ${updated.hostname}`);
  };

  const handleCommand = (cmd) => {
    addLog(`$ ${cmd}`);

    if (cmd === "clear") {
      setLogs([]);
      return;
    }

    addLog(`Command not recognized: ${cmd}`);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#0b1120",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <TopNav />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          overflow: "hidden"
        }}
      >
        <LeftPanel
          devices={devices}
          onSelect={handleDeviceSelect}
          onAdd={(d) => {
            setDevices((prev) => [...prev, d]);
            addLog(`Added device: ${d.hostname}`);
          }}
        />

        <div style={{ flex: 1, borderLeft: "1px solid #1f2937", borderRight: "1px solid #1f2937" }}>
          <Canvas devices={devices} onSelect={handleDeviceSelect} />
        </div>

        <RightPanel
          selectedDevice={selectedDevice}
          onUpdate={handleDeviceUpdate}
        />
      </div>

      <BottomPanel logs={logs} onCommand={handleCommand} />
    </div>
  );
}
