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

const browserTools: Tool[] = [
  {
    name: "CyberChef",
    description:
      "CyberChef is a browser‑based data transformation and analysis tool created by GCHQ. It supports encoding, decoding, hashing, parsing, encryption, compression, and hundreds of other operations.",
    whyUseful:
      "Perfect for DFIR, malware analysis, CTFs, and general data manipulation — all without installing anything.",
    difficulty: "Beginner",
    tags: ["DFIR", "Transforms", "Browser"],
    url: "https://gchq.github.io/CyberChef/",
    githubUrl: "https://github.com/gchq/CyberChef",
  },
  {
    name: "JWT.io Debugger",
    description:
      "JWT.io provides a browser‑based debugger for JSON Web Tokens. It decodes headers, payloads, and signatures, and highlights algorithm and validation issues.",
    whyUseful:
      "Great for learning how JWTs work and how insecure implementations lead to authentication vulnerabilities.",
    difficulty: "Beginner",
    tags: ["JWT", "Auth", "Web Security"],
    url: "https://jwt.io/",
  },
  {
    name: "Regex101",
    description:
      "Regex101 is an interactive regular expression tester with real‑time explanations, debugging, and reference guides. It supports multiple regex engines.",
    whyUseful:
      "Helps learners understand pattern matching — essential for log analysis, detection engineering, and input validation.",
    difficulty: "Beginner",
    tags: ["Regex", "Testing", "Analysis"],
    url: "https://regex101.com/",
  },
  {
    name: "Security Headers",
    description:
      "Security Headers scans websites and reports on HTTP security headers such as CSP, HSTS, X‑Frame‑Options, and more. It provides grades and recommendations.",
    whyUseful:
      "Shows how simple header misconfigurations expose web apps to XSS, clickjacking, and other attacks.",
    difficulty: "Beginner",
    tags: ["Web Security", "Headers", "Scanning"],
    url: "https://securityheaders.com/",
  },
  {
    name: "Shodan Web Interface",
    description:
      "Shodan’s browser interface allows searching for exposed devices, services, and vulnerabilities across the internet. It provides filters, maps, and metadata views.",
    whyUseful:
      "Teaches how attackers discover exposed services and how defenders monitor their external footprint.",
    difficulty: "Intermediate",
    tags: ["Recon", "Exposure", "Search"],
    url: "https://www.shodan.io/",
  },
  {
    name: "VirusTotal Web",
    description:
      "VirusTotal’s browser interface allows uploading files, URLs, and hashes for multi‑engine scanning, sandboxing, and reputation checks.",
    whyUseful:
      "Great for quick triage and understanding how reputation systems and sandboxes enrich investigations.",
    difficulty: "Beginner",
    tags: ["Malware", "Reputation", "Sandbox"],
    url: "https://www.virustotal.com/",
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

export default function BrowserToolsPage() {
  return (
    <Layout
      title="Browser‑Based Security Tools"
      description="Security tools that run directly in the browser for analysis, testing, and investigation."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Browser‑Based Security Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Browser‑based tools provide fast, installation‑free environments for analysis, testing,
          and investigation. These tools are ideal for DFIR, web security, data transformation, and
          quick triage workflows — all accessible directly from the browser.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {browserTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}