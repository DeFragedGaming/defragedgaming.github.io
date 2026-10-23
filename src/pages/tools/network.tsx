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

const networkTools: Tool[] = [
  {
    name: "Wireshark",
    description:
      "Wireshark is a graphical network protocol analyzer that captures and decodes packets across many protocols. It provides filters, dissectors, and visualizations for deep traffic inspection.",
    whyUseful:
      "Essential for learning how protocols actually behave on the wire and for investigating suspicious network activity.",
    difficulty: "Intermediate",
    tags: ["Packets", "Protocols", "GUI"],
    url: "https://www.wireshark.org/",
  },
  {
    name: "tcpdump",
    description:
      "tcpdump is a command-line packet capture tool that allows filtering and recording of network traffic. It is widely available on Unix-like systems and often used on servers.",
    whyUseful:
      "Teaches low-level packet capture and filtering, and is invaluable when GUI tools are not available.",
    difficulty: "Intermediate",
    tags: ["CLI", "Capture", "Filtering"],
    url: "https://www.tcpdump.org/",
  },
  {
    name: "Zeek",
    description:
      "Zeek is a powerful network security monitoring framework that turns raw traffic into high-level logs and events. It focuses on protocol analysis and behavioral visibility rather than signatures.",
    whyUseful:
      "Helps learners understand how rich network logs are generated and used for detection and hunting.",
    difficulty: "Advanced",
    tags: ["NSM", "Logs", "Protocols"],
    url: "https://zeek.org/",
  },
  {
    name: "MTR",
    description:
      "MTR (My Traceroute) combines ping and traceroute to show path and latency information between hosts. It continuously updates to reflect changing network conditions.",
    whyUseful:
      "Useful for understanding routing, latency, and where connectivity issues or packet loss may be occurring.",
    difficulty: "Beginner",
    tags: ["Diagnostics", "Latency", "Routing"],
    url: "https://www.bitwizard.nl/mtr/",
  },
  {
    name: "Nmap",
    description:
      "Nmap is a network scanning and discovery tool that identifies hosts, open ports, and services. It supports scripting, OS detection, and many advanced scanning techniques.",
    whyUseful:
      "Core tool for understanding network exposure, service enumeration, and how attackers map targets.",
    difficulty: "Intermediate",
    tags: ["Scanning", "Discovery", "Enumeration"],
    url: "https://nmap.org/",
  },
];

export default function NetworkToolsPage() {
  return (
    <Layout
      title="Network Analysis Tools"
      description="Traffic inspection, packet capture, and network diagnostics tools."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Network Analysis Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Network analysis tools provide visibility into how systems communicate, what protocols are
          in use, and where anomalies may exist. From packet capture to protocol analysis and
          diagnostics, these tools are foundational for defenders and network engineers alike.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {networkTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}