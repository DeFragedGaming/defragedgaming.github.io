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

const memoryTools: Tool[] = [
  {
    name: "Volatility 3",
    description:
      "Volatility 3 is the modern version of the Volatility memory forensics framework. It supports Windows, Linux, and macOS memory analysis, extracting processes, DLLs, handles, network connections, registry hives, and more.",
    whyUseful:
      "The gold standard for memory forensics — teaches how to uncover malware, persistence, and post‑exploitation activity hidden in RAM.",
    difficulty: "Advanced",
    tags: ["Memory Forensics", "Windows", "Linux", "macOS"],
    url: "https://www.volatilityfoundation.org/",
    githubUrl: "https://github.com/volatilityfoundation/volatility3",
  },
  {
    name: "Rekall",
    description:
      "Rekall is an advanced memory forensics framework designed for speed and modularity. It supports acquisition and analysis of memory images across multiple operating systems.",
    whyUseful:
      "Shows how different frameworks parse memory structures and how analysts validate findings across tools.",
    difficulty: "Advanced",
    tags: ["Memory", "Forensics", "Cross‑Platform"],
    url: "https://github.com/google/rekall",
    githubUrl: "https://github.com/google/rekall",
  },
  {
    name: "MemProcFS",
    description:
      "MemProcFS mounts a memory image as a virtual filesystem, allowing analysts to browse processes, handles, DLLs, and memory regions as if they were directories.",
    whyUseful:
      "Makes memory forensics more intuitive by exposing RAM structures in a filesystem‑like interface.",
    difficulty: "Intermediate",
    tags: ["Memory", "Virtual Filesystem", "Analysis"],
    url: "https://github.com/ufrisk/MemProcFS",
    githubUrl: "https://github.com/ufrisk/MemProcFS",
  },
  {
    name: "Redline",
    description:
      "Redline is a memory and host analysis tool from FireEye. It provides a guided interface for analyzing processes, services, registry keys, and memory artifacts.",
    whyUseful:
      "Great for beginners learning memory forensics without needing to use command‑line frameworks.",
    difficulty: "Beginner",
    tags: ["Memory", "GUI", "Triage"],
    url: "https://www.mandiant.com/resources/redline",
  },
  {
    name: "LiME (Linux Memory Extractor)",
    description:
      "LiME is a tool for acquiring memory from Linux systems in a forensically sound manner. It supports dumping RAM to disk or over the network.",
    whyUseful:
      "Teaches how memory acquisition works and how analysts collect RAM safely from live systems.",
    difficulty: "Intermediate",
    tags: ["Linux", "Acquisition", "Forensics"],
    url: "https://github.com/504ensicsLabs/LiME",
    githubUrl: "https://github.com/504ensicsLabs/LiME",
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

export default function MemoryAnalysisPage() {
  return (
    <Layout
      title="Memory Analysis Tools"
      description="Tools for memory forensics, acquisition, and RAM artifact analysis."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Memory Analysis Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Memory analysis tools help investigators uncover malware, persistence mechanisms, and
          post‑exploitation activity hidden in RAM. These tools support acquisition, parsing, and
          deep forensic analysis of volatile memory across Windows, Linux, and macOS systems.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {memoryTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}