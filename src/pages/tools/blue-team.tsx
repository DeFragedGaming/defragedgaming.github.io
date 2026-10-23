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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
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