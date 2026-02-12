import React, { useState } from "react";
import NetworkBuilderApp from "../../../components/NetworkBuilder/NetworkBuilderApp";
import Layout from "@theme/Layout";
import { createNetworkBuilderEngine } from "../../../engine/network-builder/index.js";

export default function NetworkBuilderPage() {
  const engine = createNetworkBuilderEngine();

  const [tab, setTab] = useState("instructions");

  return (
    <Layout
      title="Routing & Connectivity Lab"
      description="Interactive IT & Networking Basics Lab"
    >
      <div
        style={{
          padding: "20px",
          background: "#0d0d0d",
          color: "#ddd",
          minHeight: "100vh",
        }}
      >
        {/* ------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------ */}
        <h1 style={{ marginBottom: "10px" }}>Routing & Connectivity Lab</h1>
        <p style={{ marginBottom: "20px", maxWidth: "700px" }}>
          Build a multi‑router network, configure IP addressing, add static
          routes, and validate connectivity — all inside your browser.
        </p>

        {/* ------------------------------ */}
        {/* TABS (Mock BF Style) */}
        {/* ------------------------------ */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {[
            ["instructions", "Instructions"],
            ["scenario", "Scenario"],
            ["steps", "Step‑By‑Step"],
            ["troubleshooting", "Troubleshooting"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "10px 16px",
                background: tab === id ? "#1e90ff" : "#222",
                border: "1px solid #444",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ------------------------------ */}
        {/* TAB CONTENT */}
        {/* ------------------------------ */}
        <div
          style={{
            background: "#111",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
            maxWidth: "900px",
          }}
        >
          {tab === "instructions" && (
            <>
              <h2>What You Will Learn</h2>
              <ul>
                <li>How IP addressing and subnetting define networks</li>
                <li>How routers forward packets across multiple hops</li>
                <li>How static routes work and when they are required</li>
                <li>How to troubleshoot broken paths</li>
                <li>How to build and visualize a real network topology</li>
              </ul>
            </>
          )}

          {tab === "scenario" && (
            <>
              <h2>Lab Scenario</h2>
              <pre
                style={{
                  background: "#000",
                  padding: "15px",
                  borderRadius: "6px",
                }}
              >
{`PC1 ---- R1 ---- R2 ---- PC2`}
              </pre>
              <p>
                Each device will be placed in its own subnet. You will configure
                routing so PC1 can reach PC2 through both routers.
              </p>
            </>
          )}

          {tab === "steps" && (
            <>
              <h2>Step‑By‑Step Instructions</h2>

              <h3>1. Add Devices</h3>
              <ul>
                <li>Add PC → rename to PC1</li>
                <li>Add Router → rename to R1</li>
                <li>Add Router → rename to R2</li>
                <li>Add PC → rename to PC2</li>
              </ul>

              <h3>2. Connect the Devices</h3>
              <ul>
                <li>PC1 → R1</li>
                <li>R1 → R2</li>
                <li>R2 → PC2</li>
              </ul>

              <h3>3. Configure PC1</h3>
              <ul>
                <li>IP: 10.0.0.10</li>
                <li>Mask: 255.255.255.0</li>
                <li>Gateway: 10.0.0.1</li>
              </ul>

              <h3>4. Configure Router R1</h3>
              <ul>
                <li>Interface 0: 10.0.0.1 / 255.255.255.0</li>
                <li>Interface 1: 10.0.1.1 / 255.255.255.0</li>
                <li>Static Route → 10.0.2.0/24 via 10.0.1.2</li>
              </ul>

              <h3>5. Configure Router R2</h3>
              <ul>
                <li>Interface 0: 10.0.1.2 / 255.255.255.0</li>
                <li>Interface 1: 10.0.2.1 / 255.255.255.0</li>
                <li>Static Route → 10.0.0.0/24 via 10.0.1.1</li>
              </ul>

              <h3>6. Configure PC2</h3>
              <ul>
                <li>IP: 10.0.2.10</li>
                <li>Mask: 255.255.255.0</li>
                <li>Gateway: 10.0.2.1</li>
              </ul>

              <h3>7. Validate Connectivity</h3>
              <ul>
                <li>PC1 → PC2</li>
                <li>PC2 → PC1</li>
                <li>PC1 → R2</li>
                <li>PC2 → R1</li>
              </ul>
            </>
          )}

          {tab === "troubleshooting" && (
            <>
              <h2>Troubleshooting Tips</h2>
              <ul>
                <li>PC can’t reach router → check gateway + mask</li>
                <li>Routers can’t reach each other → check link IPs</li>
                <li>One direction works → missing static route</li>
                <li>Nothing works → check physical connections</li>
              </ul>
            </>
          )}
        </div>

        {/* ------------------------------ */}
        {/* LAB SECTION */}
        {/* ------------------------------ */}
        <NetworkBuilderApp engine={engine} />
      </div>
    </Layout>
  );
}