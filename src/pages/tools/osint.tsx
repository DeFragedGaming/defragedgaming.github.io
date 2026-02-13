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

const osintTools: Tool[] = [
  {
    name: "OSINT Framework",
    description:
      "OSINT Framework is a curated collection of links and resources for open-source intelligence gathering. It organizes tools and services by category, making it easy to discover options for people search, domain research, social media, and more.",
    whyUseful:
      "Great starting point for learners to understand the breadth of OSINT capabilities and discover specialized tools.",
    difficulty: "Beginner",
    tags: ["Directory", "Discovery", "Meta-OSINT"],
    url: "https://osintframework.com/",
  },
  {
    name: "SpiderFoot",
    description:
      "SpiderFoot is an automated OSINT collection and analysis tool that can gather data from dozens of sources. It supports scanning domains, IPs, emails, and more, correlating results into a unified view.",
    whyUseful:
      "Helps learners see how automated recon works and how disparate data points can be linked together for investigations.",
    difficulty: "Intermediate",
    tags: ["Automation", "Recon", "Correlation"],
    url: "https://www.spiderfoot.net/",
    githubUrl: "https://github.com/smicallef/spiderfoot",
  },
  {
    name: "Shodan",
    description:
      "Shodan is a search engine for internet-connected devices, indexing banners and metadata from exposed services worldwide. It allows searching by IP, port, protocol, organization, and more.",
    whyUseful:
      "Teaches how exposed services and misconfigurations can be discovered at scale, reinforcing the importance of attack surface management.",
    difficulty: "Intermediate",
    tags: ["Devices", "Exposure", "Recon"],
    url: "https://www.shodan.io/",
  },
  {
    name: "Censys",
    description:
      "Censys is an internet-wide scanning and search platform that maps hosts and services across the public internet. It provides rich filtering and aggregation for security research and asset discovery.",
    whyUseful:
      "Useful for understanding how attackers and defenders both use large-scale scanning data to identify vulnerable assets.",
    difficulty: "Intermediate",
    tags: ["Scanning", "Assets", "Research"],
    url: "https://search.censys.io/",
  },
  {
    name: "Have I Been Pwned",
    description:
      "Have I Been Pwned (HIBP) is a breach notification and credential exposure lookup service. Users can check if email addresses or passwords appear in known data breaches.",
    whyUseful:
      "Illustrates the real-world impact of breaches and credential reuse, and is a powerful teaching tool for password hygiene.",
    difficulty: "Beginner",
    tags: ["Breach Data", "Credentials", "Awareness"],
    url: "https://haveibeenpwned.com/",
  },
  {
    name: "Hunter.io",
    description:
      "Hunter.io is an email discovery and verification service focused on domains and organizations. It helps identify likely email formats and associated contacts.",
    whyUseful:
      "Demonstrates how attackers perform pretexting and targeted phishing preparation using publicly available email patterns.",
    difficulty: "Intermediate",
    tags: ["Email", "Recon", "People"],
    url: "https://hunter.io/",
  },
  {
    name: "theHarvester",
    description:
      "theHarvester is a command-line OSINT tool for gathering emails, subdomains, hosts, and employee names from public sources. It integrates with search engines and other services to collect recon data.",
    whyUseful:
      "Shows how simple automation can quickly build a profile of an organization’s external footprint and personnel.",
    difficulty: "Intermediate",
    tags: ["CLI", "Recon", "Enumeration"],
    url: "https://github.com/laramies/theHarvester",
    githubUrl: "https://github.com/laramies/theHarvester",
  },
  {
    name: "Maltego CE",
    description:
      "Maltego Community Edition is a link analysis and graphing tool for OSINT investigations. It allows visual exploration of relationships between entities like domains, people, IPs, and infrastructure.",
    whyUseful:
      "Helps learners think in graphs and relationships, which is critical for complex investigations and threat attribution.",
    difficulty: "Advanced",
    tags: ["Graph", "Link Analysis", "Visualization"],
    url: "https://www.maltego.com/ce-edition/",
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
      <p style={{ color: "#aaa", fontSize: "0.9rem", marginTop: "4px" }}>
        <strong>Why it’s useful:</strong> {tool.whyUseful}
      </p>
      <p style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "4px" }}>
        <strong>Difficulty:</strong> {tool.difficulty}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
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
      <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
        <Link
          to={tool.url}
          style={{
            background: "#0af",
            color: "#000",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "0.85rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Visit Tool
        </Link>
        {tool.docsUrl && (
          <Link
            to={tool.docsUrl}
            style={{
              background: "#0af",
              color: "#000",
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "0.85rem",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Docs
          </Link>
        )}
        {tool.githubUrl && (
          <Link
            to={tool.githubUrl}
            style={{
              background: "#0af",
              color: "#000",
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "0.85rem",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            GitHub
          </Link>
        )}
      </div>
    </div>
  );
}

export default function OSINTPage() {
  return (
    <Layout
      title="OSINT Tools"
      description="Open-source intelligence tools for recon, investigation, and data gathering."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>OSINT Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Open-source intelligence (OSINT) focuses on collecting and analyzing publicly available
          information from the internet, infrastructure, and open data sources. These tools help
          analysts, investigators, and defenders understand exposure, map attack surfaces, and
          uncover relationships between people, systems, and organizations.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {osintTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}