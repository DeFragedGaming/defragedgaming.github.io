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

const devsecopsTools: Tool[] = [
  {
    name: "Trivy",
    description:
      "Trivy is a comprehensive security scanner for containers, filesystems, and Git repositories. It detects vulnerabilities, misconfigurations, secrets, and compliance issues.",
    whyUseful:
      "Shows how DevSecOps pipelines integrate scanning into CI/CD workflows to prevent insecure deployments.",
    difficulty: "Beginner",
    tags: ["Containers", "Scanning", "CI/CD"],
    url: "https://aquasecurity.github.io/trivy/",
    githubUrl: "https://github.com/aquasecurity/trivy",
  },
  {
    name: "Semgrep",
    description:
      "Semgrep is a fast, lightweight static analysis tool that scans code for security issues using rule-based patterns. It supports many languages and integrates easily into CI pipelines.",
    whyUseful:
      "Teaches how static analysis identifies insecure coding patterns and enforces secure development practices.",
    difficulty: "Intermediate",
    tags: ["SAST", "Code Scanning", "CI/CD"],
    url: "https://semgrep.dev/",
    githubUrl: "https://github.com/semgrep/semgrep",
  },
  {
    name: "GitLeaks",
    description:
      "GitLeaks scans Git repositories for hardcoded secrets, API keys, and sensitive data. It prevents credential leakage during development and deployment.",
    whyUseful:
      "Helps learners understand how secrets leak into codebases and how automated scanning prevents breaches.",
    difficulty: "Beginner",
    tags: ["Secrets", "Git", "Scanning"],
    url: "https://github.com/gitleaks/gitleaks",
    githubUrl: "https://github.com/gitleaks/gitleaks",
  },
  {
    name: "OWASP Dependency-Check",
    description:
      "Dependency-Check identifies vulnerable dependencies in software projects by analyzing package manifests and comparing them against vulnerability databases.",
    whyUseful:
      "Shows how supply chain vulnerabilities enter applications and how dependency scanning mitigates risk.",
    difficulty: "Intermediate",
    tags: ["Dependencies", "Supply Chain", "SCA"],
    url: "https://owasp.org/www-project-dependency-check/",
  },
  {
    name: "Terraform (with Security Modules)",
    description:
      "Terraform is an infrastructure-as-code tool used to provision cloud resources. Security modules and policies help enforce secure defaults and prevent misconfigurations.",
    whyUseful:
      "Teaches how secure infrastructure is codified, versioned, and validated in modern DevSecOps workflows.",
    difficulty: "Intermediate",
    tags: ["IaC", "Cloud", "Automation"],
    url: "https://www.terraform.io/",
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

export default function DevSecOpsPage() {
  return (
    <Layout
      title="DevSecOps Tools"
      description="Tools for secure CI/CD, code scanning, and automated security workflows."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>DevSecOps Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          DevSecOps tools integrate security into development and deployment pipelines. These tools
          support static analysis, dependency scanning, secrets detection, and secure
          infrastructure-as-code practices.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {devsecopsTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}