import React from "react";
import Link from "@docusaurus/Link";

export default function LabsIndex() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>CyberTrace Labs</h1>

      <p style={{ maxWidth: "700px" }}>
        A collection of interactive cybersecurity labs designed for hands‑on
        learning and practical skill development. Each lab simulates real-world
        security concepts in a safe, browser-based environment—perfect for
        exploration, experimentation, and showcasing your technical abilities.
      </p>

      <ul>
        <li><Link to="/labs/mock-bruteforce">Mock Brute Force Lab</Link></li>
        <li><Link to="/labs/password-hashing">Password Hashing Lab</Link></li>
        <li><Link to="/labs/log-investigation">Log Investigation Lab</Link></li>
      </ul>
    </div>
  );
}
