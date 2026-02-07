import React from "react";
import Link from "@docusaurus/Link";

export default function ToolsIndex() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>CyberTrace Tools</h1>

      <p style={{ maxWidth: "700px" }}>
        A collection of real, browser‑based cybersecurity tools designed for
        hands‑on learning and safe experimentation. These utilities mirror
        real‑world workflows—hashing, log analysis, packet inspection—while
        keeping everything contained to your browser for a secure, educational
        experience.
      </p>

      <ul>
        <li><Link to="/tools/hash-playground">Hashing & Encoding Playground</Link></li>
        <li><Link to="/tools/log-analyzer">Log Analyzer</Link></li>
        <li><Link to="/tools/packet-parser">Packet Parser</Link></li>
      </ul>
    </div>
  );
}

