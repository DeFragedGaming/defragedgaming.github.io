import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function LabsOverview() {
  return (
    <Layout
      title="CyberTrace Labs"
      description="Hands‑on, interactive labs designed to teach real‑world cybersecurity and IT fundamentals."
    >
      <div className="container">
        <h1>CyberTrace Labs</h1>
        <p>
          Hands‑on, interactive labs designed to teach real‑world cybersecurity and IT fundamentals.
        </p>

        <div className="lab-grid">

          {/* Mock Brute-Force Simulation */}
          <div className="lab-card">
            <h3>Mock Brute‑Force Simulation</h3>
            <p>Analyze authentication logs, detect brute‑force attempts, and learn defensive strategies.</p>
            <Link className="button button--primary" to="/labs/mock-bruteforce">
              Start Lab
            </Link>
          </div>

          {/* Network Builder */}
          <div className="lab-card">
            <h3>Network Builder Lab</h3>
            <p>Interactive IT & Networking Basics lab. Build networks, configure devices, and validate connectivity.</p>
            <Link className="button button--primary" to="/labs/network-builder">
              Start Lab
            </Link>
          </div>

          {/* Password Hashing */}
          <div className="lab-card">
            <h3>Password Hashing Lab</h3>
            <p>Coming soon — explore hashing algorithms, salts, and secure password storage.</p>
          </div>

          {/* Log Investigation */}
          <div className="lab-card">
            <h3>Log Investigation Lab</h3>
            <p>Coming soon — analyze logs, trace attacker activity, and identify indicators of compromise.</p>
          </div>

          {/* VLAN Segmentation */}
          <div className="lab-card">
            <h3>VLAN Segmentation Lab</h3>
            <p>Coming soon — configure VLANs, trunk ports, and segmentation rules.</p>
          </div>

          {/* DMZ & Firewall */}
          <div className="lab-card">
            <h3>DMZ & Firewall Rules Lab</h3>
            <p>Coming soon — build a DMZ, configure firewall rules, and validate secure access.</p>
          </div>

          {/* Troubleshooting */}
          <div className="lab-card">
            <h3>Troubleshooting Scenarios</h3>
            <p>Coming soon — diagnose broken networks and apply real‑world troubleshooting techniques.</p>
          </div>

        </div>
      </div>
    </Layout>
  );
}