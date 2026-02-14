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

const icsTools: Tool[] = [
  {
    name: "GRASSMARLIN",
    description:
      "GRASSMARLIN is a passive network mapping tool for ICS/SCADA environments. It identifies industrial devices, communication paths, and protocol usage without disrupting operations.",
    whyUseful:
      "Teaches how defenders map industrial networks safely and identify risky communication flows.",
    difficulty: "Intermediate",
    tags: ["ICS", "Mapping", "Passive"],
    url: "https://github.com/nsacyber/GRASSMARLIN",
    githubUrl: "https://github.com/nsacyber/GRASSMARLIN",
  },
  {
    name: "ConPot",
    description:
      "ConPot is an ICS honeypot designed to simulate industrial control systems. It emulates common protocols and devices to attract attackers and study their behavior.",
    whyUseful:
      "Shows how ICS honeypots gather intelligence on adversary techniques targeting industrial environments.",
    difficulty: "Advanced",
    tags: ["Honeypot", "ICS", "Simulation"],
    url: "https://github.com/mushorg/conpot",
    githubUrl: "https://github.com/mushorg/conpot",
  },
  {
    name: "ModbusPal",
    description:
      "ModbusPal is a Modbus simulator that allows users to create virtual industrial devices and test interactions with Modbus-based systems.",
    whyUseful:
      "Helps learners understand Modbus communication and how attackers manipulate industrial protocols.",
    difficulty: "Beginner",
    tags: ["Modbus", "Simulation", "ICS"],
    url: "https://sourceforge.net/projects/modbuspal/",
  },
  {
    name: "PLCScan",
    description:
      "PLCScan is a tool for scanning and identifying PLCs (Programmable Logic Controllers) across industrial networks. It supports multiple ICS protocols.",
    whyUseful:
      "Shows how attackers enumerate industrial devices and how defenders detect unauthorized scanning.",
    difficulty: "Intermediate",
    tags: ["PLC", "Scanning", "ICS"],
    url: "https://github.com/0x0mar/plcscan",
    githubUrl: "https://github.com/0x0mar/plcscan",
  },
  {
    name: "Scapy (ICS Extensions)",
    description:
      "Scapy is a packet manipulation tool that supports crafting and analyzing ICS protocol packets through extensions. It enables deep testing of industrial communication.",
    whyUseful:
      "Teaches how industrial protocols can be manipulated and how malformed packets affect ICS systems.",
    difficulty: "Advanced",
    tags: ["Packet Crafting", "ICS", "Protocols"],
    url: "https://scapy.net/",
    githubUrl: "https://github.com/secdev/scapy",
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

export default function ICSPage() {
  return (
    <Layout
      title="ICS / SCADA Tools"
      description="Industrial control system security tools for critical infrastructure."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>ICS / SCADA Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          ICS and SCADA tools help analysts understand how industrial systems operate and how they
          can be secured. These tools support passive mapping, protocol analysis, honeypots, and
          simulation of industrial devices.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {icsTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}