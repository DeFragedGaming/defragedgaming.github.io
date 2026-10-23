import React from "react";
import Layout from "@theme/Layout";
import ToolCard from "../../components/ToolDirectoryCard";

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

const threatIntelTools: Tool[] = [
  {
    name: "AlienVault OTX",
    description:
      "AlienVault Open Threat Exchange (OTX) is a community-driven threat intelligence platform where researchers share indicators of compromise, malware families, and campaigns. It provides pulse-based collections of related indicators.",
    whyUseful:
      "Helps learners see how threat intel is shared, consumed, and operationalized in real environments.",
    difficulty: "Beginner",
    tags: ["IOC", "Community", "Feeds"],
    url: "https://otx.alienvault.com/",
  },
  {
    name: "AbuseIPDB",
    description:
      "AbuseIPDB is a database of reported malicious IP addresses, aggregating abuse reports from users and systems. It allows lookups and submissions of abusive behavior tied to IPs.",
    whyUseful:
      "Useful for quickly checking whether an IP has a history of abuse and understanding how reputation systems work.",
    difficulty: "Beginner",
    tags: ["IP Reputation", "Abuse", "Lookup"],
    url: "https://www.abuseipdb.com/",
  },
  {
    name: "GreyNoise",
    description:
      "GreyNoise analyzes internet-wide scan and noise traffic to distinguish background scanning from targeted activity. It labels IPs associated with common scanners, research, and benign noise.",
    whyUseful:
      "Teaches analysts how to filter out background noise from real threats, improving signal-to-noise in alert triage.",
    difficulty: "Intermediate",
    tags: ["Noise", "Scanning", "Attribution"],
    url: "https://www.greynoise.io/",
  },
  {
    name: "VirusTotal",
    description:
      "VirusTotal aggregates antivirus detections, sandbox behavior, and metadata for files, URLs, and domains. It is widely used for quick reputation checks and malware triage.",
    whyUseful:
      "Shows how multi-engine reputation and sandboxing can accelerate triage and enrich investigations.",
    difficulty: "Beginner",
    tags: ["Reputation", "Malware", "Sandbox"],
    url: "https://www.virustotal.com/",
  },
  {
    name: "Pulsedive",
    description:
      "Pulsedive is a threat intelligence platform that aggregates and enriches indicators such as domains, IPs, and URLs. It provides risk scores, context, and related indicators.",
    whyUseful:
      "Helps learners understand enrichment workflows and how context turns raw indicators into actionable intel.",
    difficulty: "Intermediate",
    tags: ["Enrichment", "Indicators", "Risk"],
    url: "https://pulsedive.com/",
  },
  {
    name: "MISP",
    description:
      "MISP (Malware Information Sharing Platform) is an open-source platform for sharing, storing, and correlating threat intelligence. It supports structured events, attributes, and taxonomies.",
    whyUseful:
      "Demonstrates how organizations collaborate on threat intel and how structured data enables automation.",
    difficulty: "Advanced",
    tags: ["Sharing", "Platform", "Structured Intel"],
    url: "https://www.misp-project.org/",
    githubUrl: "https://github.com/MISP/MISP",
  },
];

export default function ThreatIntelPage() {
  return (
    <Layout
      title="Threat Intelligence Tools"
      description="Feeds, platforms, and services for tracking malicious activity and indicators of compromise."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Threat Intelligence Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Threat intelligence tools help security teams understand adversary behavior, track
          campaigns, and enrich alerts with context. These platforms and services provide
          indicators, reputation data, and correlations that turn raw events into actionable
          insights for detection and response.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {threatIntelTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}