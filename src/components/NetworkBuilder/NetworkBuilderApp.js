import React, { useState } from "react";
import Canvas from "../../engine/network-builder/canvas/Canvas.js";
import { listRouterProfiles } from "../../engine/router/profiles/index.js";

export default function NetworkBuilderApp({ engine }) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [routerVendor, setRouterVendor] = useState("generic");

  const rawProfiles = listRouterProfiles();
  const profiles = Array.isArray(rawProfiles) ? rawProfiles : [];

  const addPC = () => {
    if (!engine) return;
    const id = "pc" + (engine.state.getAllDevices().length + 1);
    engine.deviceManager.createPC(id, 200, 200);
  };

  const addRouter = () => {
    if (!engine) return;
    const id = "r" + (engine.state.getAllDevices().length + 1);
    engine.deviceManager.createRouter(id, 300, 200, routerVendor);
  };

  const toggleConnectMode = () => {
    window.dispatchEvent(
      new CustomEvent("cybertrace-canvas-mode", {
        detail: "toggle-connect-mode",
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",   
        overflow: "hidden", 
      }}
    >
      
      <div
        style={{
          width: "260px",
          background: "#111",
          padding: "10px",
          color: "#fff",
          overflowY: "auto", 
          overflowX: "hidden",
          borderRight: "1px solid #222",
        }}
      >
        <h2>Network Builder</h2>

        <button
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            background: "#2a6",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={addPC}
        >
          Add PC
        </button>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            Router Vendor
          </label>
          <select
            style={{
              width: "100%",
              padding: "6px",
              background: "#222",
              color: "#fff",
              border: "1px solid #444",
            }}
            value={routerVendor}
            onChange={(e) => setRouterVendor(e.target.value)}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            background: "#268",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={addRouter}
        >
          Add Router
        </button>

        <button
          style={{
            width: "100%",
            padding: "8px",
            background: "#884",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={toggleConnectMode}
        >
          Connect Devices
        </button>

        <hr style={{ margin: "15px 0", borderColor: "#333" }} />

        <h3>Device Config</h3>
        {selectedDevice ? (
          <engine.ui.DeviceConfigPanel
            device={selectedDevice}
            engine={engine}
          />
        ) : (
          <p style={{ color: "#aaa" }}>Select a device</p>
        )}
      </div>

      
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          background: "#000",
        }}
      >
        <div
          style={{
            width: "900px",   
            height: "700px",  
            overflow: "hidden",
          }}
        >
          <Canvas engine={engine} onSelectDevice={setSelectedDevice} />
        </div>
      </div>
    </div>
  );
}