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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
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