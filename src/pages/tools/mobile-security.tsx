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

const mobileTools: Tool[] = [
  {
    name: "MobSF (Mobile Security Framework)",
    description:
      "MobSF is an automated mobile application security testing framework for Android, iOS, and Windows apps. It supports static analysis, dynamic analysis, malware detection, and API inspection. The platform provides detailed reports and integrates easily into testing workflows.",
    whyUseful:
      "Gives learners a full mobile analysis environment without needing to manually configure emulators, sandboxes, or reverse engineering tools.",
    difficulty: "Intermediate",
    tags: ["Android", "iOS", "Static Analysis", "Dynamic Analysis"],
    url: "https://mobsf.github.io/",
    githubUrl: "https://github.com/MobSF/Mobile-Security-Framework-MobSF",
  },
  {
    name: "Frida",
    description:
      "Frida is a dynamic instrumentation toolkit that allows injecting JavaScript into running applications. It supports Android, iOS, Windows, macOS, and Linux, enabling runtime analysis, function hooking, and bypassing security controls.",
    whyUseful:
      "Shows how attackers manipulate mobile apps at runtime, bypass SSL pinning, and inspect sensitive logic.",
    difficulty: "Advanced",
    tags: ["Instrumentation", "Dynamic Analysis", "Mobile"],
    url: "https://frida.re/",
    githubUrl: "https://github.com/frida/frida",
  },
  {
    name: "APKTool",
    description:
      "APKTool is a reverse engineering tool for Android APKs. It decodes resources, disassembles smali code, and allows rebuilding modified APKs. It is widely used for malware analysis and app modification.",
    whyUseful:
      "Teaches how Android apps are structured internally and how attackers analyze or tamper with mobile applications.",
    difficulty: "Intermediate",
    tags: ["Android", "Reverse Engineering", "Smali"],
    url: "https://ibotpeaches.github.io/Apktool/",
    githubUrl: "https://github.com/iBotPeaches/Apktool",
  },
  {
    name: "Objection",
    description:
      "Objection is a runtime mobile exploration toolkit powered by Frida. It allows bypassing SSL pinning, inspecting storage, interacting with app components, and analyzing runtime behavior without requiring a rooted device.",
    whyUseful:
      "Shows how attackers bypass mobile security controls and inspect sensitive app internals during runtime.",
    difficulty: "Advanced",
    tags: ["Mobile", "Runtime", "Frida"],
    url: "https://github.com/sensepost/objection",
    githubUrl: "https://github.com/sensepost/objection",
  },
  {
    name: "QARK (Quick Android Review Kit)",
    description:
      "QARK scans Android applications for security vulnerabilities, misconfigurations, and insecure coding patterns. It provides detailed findings and remediation guidance.",
    whyUseful:
      "Great for learning common Android vulnerabilities and how automated tools detect insecure mobile code.",
    difficulty: "Beginner",
    tags: ["Android", "Scanning", "SAST"],
    url: "https://github.com/linkedin/qark",
    githubUrl: "https://github.com/linkedin/qark",
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

export default function MobileSecurityPage() {
  return (
    <Layout
      title="Mobile Security Tools"
      description="Tools for analyzing, testing, and securing Android and iOS applications."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Mobile Security Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Mobile security tools help analyze Android and iOS applications, detect vulnerabilities,
          inspect runtime behavior, and reverse engineer mobile binaries. These tools support static
          analysis, dynamic instrumentation, and secure mobile development practices.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {mobileTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}