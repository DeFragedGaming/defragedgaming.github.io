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

const vulnTools: Tool[] = [
  {
    name: "Nessus Essentials",
    description:
      "Nessus Essentials is a free vulnerability scanner that identifies misconfigurations, missing patches, insecure services, and known CVEs across systems and networks. It provides detailed reports and remediation guidance.",
    whyUseful:
      "Great for learning how enterprise vulnerability scanning works and how organizations track and remediate weaknesses.",
    difficulty: "Beginner",
    tags: ["Scanning", "CVE", "Network Security"],
    url: "https://www.tenable.com/products/nessus/nessus-essentials",
  },
  {
    name: "OpenVAS / Greenbone",
    description:
      "OpenVAS is a fully open-source vulnerability scanner maintained by Greenbone. It performs deep network scanning, CVE detection, and compliance checks with regularly updated feeds.",
    whyUseful:
      "Shows how open-source scanners detect vulnerabilities and how scanning engines structure their checks.",
    difficulty: "Intermediate",
    tags: ["Open Source", "Scanning", "CVE"],
    url: "https://www.greenbone.net/en/",
    githubUrl: "https://github.com/greenbone",
  },
  {
    name: "Nmap + NSE Scripts",
    description:
      "Nmap is a network discovery and scanning tool. With the Nmap Scripting Engine (NSE), it can detect vulnerabilities, misconfigurations, weak services, and insecure protocols.",
    whyUseful:
      "Teaches how scanning works at a low level and how scripts extend scanning into vulnerability detection.",
    difficulty: "Intermediate",
    tags: ["Scanning", "Enumeration", "Scripting"],
    url: "https://nmap.org/",
  },
  {
    name: "Qualys Community Edition",
    description:
      "Qualys CE provides cloud-based vulnerability scanning for small environments. It identifies CVEs, misconfigurations, and compliance issues across assets.",
    whyUseful:
      "Introduces cloud-based scanning workflows and how enterprise vulnerability management platforms operate.",
    difficulty: "Beginner",
    tags: ["Cloud", "Scanning", "Compliance"],
    url: "https://www.qualys.com/community-edition/",
  },
  {
    name: "Clair",
    description:
      "Clair is an open-source vulnerability scanner for container images. It analyzes layers, detects CVEs, and integrates with CI/CD pipelines.",
    whyUseful:
      "Shows how container images accumulate vulnerabilities and how DevSecOps teams automate scanning.",
    difficulty: "Intermediate",
    tags: ["Containers", "CVE", "CI/CD"],
    url: "https://github.com/quay/clair",
    githubUrl: "https://github.com/quay/clair",
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

export default function VulnerabilityScannersPage() {
  return (
    <Layout
      title="Vulnerability Scanners"
      description="Tools for identifying CVEs, misconfigurations, and insecure services."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Vulnerability Scanners</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Vulnerability scanners help identify weaknesses across systems, networks, and containers.
          These tools detect CVEs, insecure configurations, outdated software, and compliance
          issues, forming the backbone of vulnerability management programs.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {vulnTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}