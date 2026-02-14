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

const siemTools: Tool[] = [
  {
    name: "Elastic Security (ELK Stack)",
    description:
      "Elastic Security is a SIEM and endpoint security platform built on Elasticsearch, Logstash, and Kibana. It provides log ingestion, correlation, detection rules, dashboards, and timeline investigations. Elastic is widely used in SOCs for threat hunting and alert triage.",
    whyUseful:
      "Teaches how modern SIEM pipelines work — from log ingestion to correlation to detection engineering — all in an open and extensible platform.",
    difficulty: "Intermediate",
    tags: ["SIEM", "Hunting", "Detection", "Elastic"],
    url: "https://www.elastic.co/security",
  },
  {
    name: "Wazuh",
    description:
      "Wazuh is an open-source SIEM and XDR platform that provides log analysis, intrusion detection, file integrity monitoring, vulnerability detection, and compliance checks. It integrates with Elastic for visualization and alerting.",
    whyUseful:
      "Great for learning SIEM fundamentals and understanding how endpoint telemetry feeds into detection pipelines.",
    difficulty: "Intermediate",
    tags: ["SIEM", "Endpoint", "Monitoring"],
    url: "https://wazuh.com/",
  },
  {
    name: "Graylog",
    description:
      "Graylog is a centralized log management platform that supports ingestion, parsing, alerting, dashboards, and correlation. It is known for its scalability and ease of use in enterprise environments.",
    whyUseful:
      "Helps learners understand log pipelines, parsing rules, and how SOCs build dashboards and alerts.",
    difficulty: "Beginner",
    tags: ["Log Management", "Dashboards", "Alerting"],
    url: "https://www.graylog.org/",
  },
  {
    name: "Splunk Free",
    description:
      "Splunk is a leading enterprise SIEM and log analytics platform. The free edition allows indexing and searching logs, building dashboards, and experimenting with SPL (Search Processing Language).",
    whyUseful:
      "SPL is widely used in SOCs — learning it gives analysts a major advantage in detection engineering and threat hunting.",
    difficulty: "Intermediate",
    tags: ["SPL", "Dashboards", "Enterprise SIEM"],
    url: "https://www.splunk.com/",
  },
  {
    name: "Sigma Rules",
    description:
      "Sigma is an open, generic rule format for SIEM detections. Sigma rules can be converted into queries for many SIEMs, including Elastic, Splunk, Sentinel, and QRadar.",
    whyUseful:
      "Teaches how detections are written in a vendor‑agnostic way and how SOCs standardize detection engineering.",
    difficulty: "Advanced",
    tags: ["Detection Engineering", "Rules", "SIEM"],
    url: "https://github.com/SigmaHQ/sigma",
    githubUrl: "https://github.com/SigmaHQ/sigma",
  },
  {
    name: "Sysmon",
    description:
      "Sysmon is a Windows system monitoring tool that logs detailed process, network, and registry activity. It is commonly used with SIEMs to provide high‑fidelity telemetry for detection engineering.",
    whyUseful:
      "Shows how endpoint telemetry becomes the backbone of SIEM detections and threat hunting.",
    difficulty: "Intermediate",
    tags: ["Windows", "Telemetry", "Detection"],
    url: "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon",
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

export default function SIEMToolsPage() {
  return (
    <Layout
      title="SIEM & Log Analysis Tools"
      description="Tools for log ingestion, correlation, detection engineering, and SOC workflows."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>SIEM & Log Analysis Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          SIEM and log analysis tools help security teams collect, correlate, and analyze telemetry
          from across an organization. These tools support detection engineering, threat hunting,
          alert triage, and incident response by turning raw logs into actionable insights.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {siemTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}