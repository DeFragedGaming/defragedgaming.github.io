import React from "react";
import Link from "@docusaurus/Link";

export default function ToolsIndex() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>CyberTrace Tools</h1>
      <ul>
        <li><Link to="/tools/hash-playground">Hashing & Encoding Playground</Link></li>
        <li><Link to="/tools/log-analyzer">Log Analyzer</Link></li>
        <li><Link to="/tools/packet-parser">Packet Parser</Link></li>
      </ul>
    </div>
  );
}
