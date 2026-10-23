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

const dfirTools: Tool[] = [
  {
    name: "Autopsy",
    description:
      "Autopsy is a digital forensics platform built on The Sleuth Kit, providing a GUI for analyzing disks, filesystems, and artifacts. It supports timelines, keyword search, and common forensic workflows.",
    whyUseful:
      "Great for teaching disk forensics and artifact analysis without requiring commercial forensic suites.",
    difficulty: "Intermediate",
    tags: ["Disk Forensics", "GUI", "Artifacts"],
    url: "https://www.autopsy.com/",
  },
  {
    name: "Volatility",
    description:
      "Volatility is a memory forensics framework for analyzing RAM dumps from Windows, Linux, and macOS systems. It extracts processes, network connections, DLLs, and more from volatile memory.",
    whyUseful:
      "Shows how powerful memory analysis can be for uncovering stealthy malware and post-exploitation activity.",
    difficulty: "Advanced",
    tags: ["Memory", "Forensics", "CLI"],
    url: "https://www.volatilityfoundation.org/",
    githubUrl: "https://github.com/volatilityfoundation/volatility3",
  },
  {
    name: "CyberChef",
    description:
      "CyberChef is a browser-based data transformation tool that supports encoding, decoding, parsing, and analysis of many data formats. It is often used in DFIR, malware analysis, and CTFs.",
    whyUseful:
      "Provides a safe, flexible environment for experimenting with data transformations and decoding suspicious content.",
    difficulty: "Beginner",
    tags: ["Browser", "Transforms", "DFIR Utility"],
    url: "https://gchq.github.io/CyberChef/",
    githubUrl: "https://github.com/gchq/CyberChef",
  },
  {
    name: "Velociraptor",
    description:
      "Velociraptor is an endpoint visibility and DFIR platform that uses a query language (VQL) to collect artifacts at scale. It supports live response, hunting, and forensic collection.",
    whyUseful:
      "Helps learners understand modern, scalable DFIR workflows and how queries drive targeted evidence collection.",
    difficulty: "Advanced",
    tags: ["Endpoint", "Hunting", "Collection"],
    url: "https://www.velocidex.com/velociraptor/",
    githubUrl: "https://github.com/Velocidex/velociraptor",
  },
  {
    name: "KAPE (Kroll Artifact Parser and Extractor)",
    description:
      "KAPE is a triage-focused DFIR tool that quickly collects and processes key forensic artifacts from Windows systems. It is designed for speed and targeted evidence gathering.",
    whyUseful:
      "Shows how focused triage can drastically reduce time-to-evidence during incident response.",
    difficulty: "Advanced",
    tags: ["Triage", "Artifacts", "Windows"],
    url: "https://www.kroll.com/en/services/cyber-risk/incident-response-litigation-support/kape",
  },
];

export default function DFIRPage() {
  return (
    <Layout
      title="DFIR & Forensics Tools"
      description="Digital forensics and incident response tools for artifacts, memory, and endpoint analysis."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>DFIR & Forensics Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          DFIR tools focus on collecting, preserving, and analyzing evidence from systems after (or
          during) an incident. From disk and memory forensics to large-scale endpoint collection,
          these tools support investigations, root cause analysis, and response.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {dfirTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}