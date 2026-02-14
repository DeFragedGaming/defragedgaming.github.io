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

const blueTeamTools: Tool[] = [
  {
    name: "Wazuh",
    description:
      "Wazuh is an open-source SIEM and endpoint security platform that provides log analysis, intrusion detection, file integrity monitoring, and compliance checks. It integrates with Elastic Stack for visualization.",
    whyUseful:
      "Great for learning SIEM fundamentals and understanding how alerts, rules, and log pipelines work.",
    difficulty: "Intermediate",
    tags: ["SIEM", "Endpoint", "Monitoring"],
    url: "https://wazuh.com/",
  },
  {
    name: "OSQuery",
    description:
      "OSQuery exposes system information through SQL queries, enabling real-time visibility into processes, users, network connections, and more. It is widely used for detection and incident response.",
    whyUseful:
      "Teaches how structured queries can reveal suspicious activity and support threat hunting.",
    difficulty: "Intermediate",
    tags: ["SQL", "Endpoint", "Visibility"],
    url: "https://osquery.io/",
    githubUrl: "https://github.com/osquery/osquery",
  },
  {
    name: "Sysmon",
    description:
      "Sysmon is a Windows system monitoring tool that logs detailed process, network, and registry activity. It is commonly used with SIEMs for detection engineering.",
    whyUseful:
      "Shows how granular telemetry enables high-fidelity detections and behavioral analytics.",
    difficulty: "Intermediate",
    tags: ["Windows", "Telemetry", "Detection"],
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon",
  },
  {
    name: "Elastic Security",
    description:
      "Elastic Security provides SIEM, endpoint protection, and threat hunting capabilities built on the Elastic Stack. It supports rule-based detections, dashboards, and timeline investigations.",
    whyUseful:
      "Helps learners understand modern SIEM workflows and how detection engineering is performed.",
    difficulty: "Advanced",
    tags: ["SIEM", "Hunting", "Elastic"],
    url: "https://www.elastic.co/security",
  },
  {
    name: "CrowdSec",
    description:
      "CrowdSec is a collaborative intrusion detection and prevention system that uses community-driven threat intelligence to block malicious IPs. It supports logs from many services.",
    whyUseful:
      "Demonstrates how community defense and shared intel can improve detection and response.",
    difficulty: "Beginner",
    tags: ["IDS", "Community", "Threat Intel"],
    url: "https://www.crowdsec.net/",
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

export default function BlueTeamPage() {
  return (
    <Layout
      title="Blue Team Tools"
      description="Defensive tools for monitoring, detection, and incident response."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Blue Team Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Blue team tools focus on detection, monitoring, and response. These platforms and utilities
          help defenders gain visibility, analyze telemetry, and build detections that identify
          malicious behavior across endpoints and networks.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {blueTeamTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}