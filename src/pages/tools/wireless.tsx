import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

type Tool = {
  name: string;
  description: string;
  whyUseful: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  url: string;
  docsUrl?: string;
  githubUrl?: string;
};

const wirelessTools: Tool[] = [
  {
    name: "Aircrack-ng",
    description:
      "Aircrack-ng is a suite of tools for auditing WiFi networks. It supports packet capture, injection, replay, and cracking of WEP/WPA/WPA2 keys. It is widely used in wireless penetration testing and research.",
    whyUseful:
      "Teaches how wireless encryption works, how handshakes are captured, and how attackers exploit weak configurations.",
    difficulty: "Intermediate",
    tags: ["WiFi", "Packet Capture", "Cracking"],
    url: "https://www.aircrack-ng.org/",
    githubUrl: "https://github.com/aircrack-ng/aircrack-ng",
  },
  {
    name: "Kismet",
    description:
      "Kismet is a wireless network detector, sniffer, and intrusion detection system. It supports WiFi, Bluetooth, SDR, and other wireless protocols, providing detailed device and signal analysis.",
    whyUseful:
      "Helps learners understand wireless discovery, rogue devices, and how attackers map wireless environments.",
    difficulty: "Intermediate",
    tags: ["WiFi", "Detection", "Sniffing"],
    url: "https://www.kismetwireless.net/",
  },
  {
    name: "Wireshark (Wireless Mode)",
    description:
      "Wireshark can capture and analyze wireless frames when used with compatible adapters. It provides deep insight into 802.11 management, control, and data frames.",
    whyUseful:
      "Shows how wireless protocols behave at the frame level and how attackers analyze WiFi traffic.",
    difficulty: "Intermediate",
    tags: ["Packets", "802.11", "Analysis"],
    url: "https://www.wireshark.org/",
  },
  {
    name: "Bettercap",
    description:
      "Bettercap is a powerful network attack and monitoring framework that supports WiFi, BLE, and other wireless protocols. It includes modules for sniffing, spoofing, and MITM attacks.",
    whyUseful:
      "Demonstrates how attackers perform wireless MITM attacks and manipulate traffic in real time.",
    difficulty: "Advanced",
    tags: ["MITM", "WiFi", "BLE"],
    url: "https://www.bettercap.org/",
    githubUrl: "https://github.com/bettercap/bettercap",
  },
  {
    name: "RTL-SDR",
    description:
      "RTL-SDR is a low-cost software-defined radio platform that enables receiving signals across a wide frequency range. It is used for RF analysis, ADS-B, pager decoding, and more.",
    whyUseful:
      "Introduces learners to SDR concepts and how attackers analyze non-WiFi wireless signals.",
    difficulty: "Intermediate",
    tags: ["SDR", "RF", "Signal Analysis"],
    url: "https://www.rtl-sdr.com/",
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3 style={{ margin: 0 }}>{tool.name}</h3>
      <p style={{ color: "#ccc", margin: 0 }}>{tool.description}</p>

      <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
        <strong>Why it’s useful:</strong> {tool.whyUseful}
      </p>

      <p style={{ color: "#aaa", fontSize: "0.85rem" }}>
        <strong>Difficulty:</strong> {tool.difficulty}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tool.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#222",
              padding: "3px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              color: "#ccc",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
        <Link
          to={tool.url}
          style={{
            background: "#0af",
            color: "#000",
            padding: "6px 12px",
            borderRadius: "4px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Visit Tool
        </Link>

        {tool.githubUrl && (
          <Link
            to={tool.githubUrl}
            style={{
              background: "#0af",
              color: "#000",
              padding: "6px 12px",
              borderRadius: "4px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            GitHub
          </Link>
        )}
      </div>
    </div>
  );
}

export default function WirelessPage() {
  return (
    <Layout
      title="Wireless & Radio Tools"
      description="WiFi, SDR, Bluetooth, and RF analysis tools."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Wireless & Radio Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Wireless security tools help analysts understand how WiFi, Bluetooth, and RF systems
          operate — and how attackers exploit them. These tools support packet capture, signal
          analysis, MITM attacks, and wireless reconnaissance.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {wirelessTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}