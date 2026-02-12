import React, { useState, useEffect } from "react";
import { listRouterProfiles, getRouterProfile } from "../../router/profiles/index.js";

export default function DeviceConfigPanel({ device, engine }) {
  const profiles = listRouterProfiles() || [];

  const [form, setForm] = useState({
    interfaces: [],
    routes: [],
  });

  // Ensure safe defaults
  const safeDevice = {
    ...device,
    interfaces: Array.isArray(device?.interfaces) ? device.interfaces : [],
    routes: Array.isArray(device?.routes) ? device.routes : [],
  };

  useEffect(() => {
    if (device) {
      setForm({
        ...safeDevice,
        interfaces: [...safeDevice.interfaces],
        routes: [...safeDevice.routes],
      });
    }
  }, [device]);

  if (!device) {
    return <p style={{ color: "#aaa" }}>Select a device to configure it.</p>;
  }

  const updateDevice = (updates) => {
    const newData = { ...form, ...updates };

    // Always enforce safe arrays
    newData.interfaces = Array.isArray(newData.interfaces) ? newData.interfaces : [];
    newData.routes = Array.isArray(newData.routes) ? newData.routes : [];

    setForm(newData);
    engine.deviceManager.updateDevice(device.id, newData);
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

  // -----------------------------
  // PC CONFIG UI
  // -----------------------------
  const renderPCConfig = () => (
    <>
      <div style={fieldStyle}>
        <label style={labelStyle}>Hostname</label>
        <input
          style={inputStyle}
          value={form.name || ""}
          onChange={(e) => updateDevice({ name: e.target.value })}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>IP Address</label>
        <input
          style={inputStyle}
          value={form.ip || ""}
          onChange={(e) => updateDevice({ ip: e.target.value })}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Subnet Mask</label>
        <input
          style={inputStyle}
          value={form.subnetMask || ""}
          onChange={(e) => updateDevice({ subnetMask: e.target.value })}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Gateway</label>
        <input
          style={inputStyle}
          value={form.gateway || ""}
          onChange={(e) => updateDevice({ gateway: e.target.value })}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>MAC Address</label>
        <input
          style={inputStyle}
          value={form.mac || ""}
          onChange={(e) => updateDevice({ mac: e.target.value })}
        />
      </div>
    </>
  );

  // -----------------------------
  // ROUTER CONFIG UI
  // -----------------------------
  const renderRouterConfig = () => {
    const profile = getRouterProfile(form.profile);

    const updateInterface = (index, updates) => {
      const newIfaces = [...form.interfaces];
      newIfaces[index] = { ...newIfaces[index], ...updates };
      updateDevice({ interfaces: newIfaces });
    };

    const addInterface = () => {
      const newIndex = form.interfaces.length;
      const newIface = {
        name: profile.makeInterfaceName(newIndex),
        ip: "",
        subnetMask: "",
        mac: randomMac(),
      };
      updateDevice({ interfaces: [...form.interfaces, newIface] });
    };

    const removeInterface = (index) => {
      const newIfaces = form.interfaces.filter((_, i) => i !== index);
      updateDevice({ interfaces: newIfaces });
    };

    const updateRoute = (index, updates) => {
      const newRoutes = [...form.routes];
      newRoutes[index] = { ...newRoutes[index], ...updates };
      updateDevice({ routes: newRoutes });
    };

    const addRoute = () => {
      updateDevice({
        routes: [...form.routes, { destination: "", mask: "", nextHop: "" }],
      });
    };

    const removeRoute = (index) => {
      const newRoutes = form.routes.filter((_, i) => i !== index);
      updateDevice({ routes: newRoutes });
    };

    return (
      <>
        {/* Router Model */}
        <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>Router Model</h3>
        <div style={fieldStyle}>
          <label style={labelStyle}>Vendor</label>
          <select
            style={inputStyle}
            value={form.profile}
            onChange={(e) => updateDevice({ profile: e.target.value })}
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Interfaces */}
        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Interfaces</h3>

        {(form.interfaces || []).map((iface, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #444",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>Interface Name</label>
              <input
                style={inputStyle}
                value={iface.name}
                onChange={(e) => updateInterface(index, { name: e.target.value })}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>IP Address</label>
              <input
                style={inputStyle}
                value={iface.ip}
                onChange={(e) => updateInterface(index, { ip: e.target.value })}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Subnet Mask</label>
              <input
                style={inputStyle}
                value={iface.subnetMask}
                onChange={(e) =>
                  updateInterface(index, { subnetMask: e.target.value })
                }
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>MAC Address</label>
              <input
                style={inputStyle}
                value={iface.mac}
                onChange={(e) => updateInterface(index, { mac: e.target.value })}
              />
            </div>

            <button
              style={{
                marginTop: "6px",
                padding: "6px 10px",
                background: "#922",
                border: "none",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => removeInterface(index)}
            >
              Remove Interface
            </button>
          </div>
        ))}

        <button
          style={{
            padding: "8px 12px",
            background: "#2a6",
            border: "none",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
          onClick={addInterface}
        >
          Add Interface
        </button>

        {/* Routing Table */}
        <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Routing Table</h3>

        {(form.routes || []).map((route, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #444",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>Destination Network</label>
              <input
                style={inputStyle}
                value={route.destination}
                onChange={(e) =>
                  updateRoute(index, { destination: e.target.value })
                }
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Subnet Mask</label>
              <input
                style={inputStyle}
                value={route.mask}
                onChange={(e) => updateRoute(index, { mask: e.target.value })}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Next Hop</label>
              <input
                style={inputStyle}
                value={route.nextHop}
                onChange={(e) =>
                  updateRoute(index, { nextHop: e.target.value })
                }
              />
            </div>

            <button
              style={{
                marginTop: "6px",
                padding: "6px 10px",
                background: "#922",
                border: "none",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => removeRoute(index)}
            >
              Remove Route
            </button>
          </div>
        ))}

        <button
          style={{
            padding: "8px 12px",
            background: "#2a6",
            border: "none",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={addRoute}
        >
          Add Route
        </button>
      </>
    );
  };

  return (
    <div style={{ padding: "10px", overflowY: "auto", maxHeight: "100%" }}>
      <h3 style={{ marginBottom: "15px" }}>Device Configuration</h3>

      {device.type === "router" ? renderRouterConfig() : renderPCConfig()}
    </div>
  );
}

// Utility for MAC generation
function randomMac() {
  return (
    "AA:AA:AA:" +
    [...Array(3)]
      .map(() =>
        Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, "0")
      )
      .join(":")
      .toUpperCase()
  );
}