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

const redTeamTools: Tool[] = [
  {
    name: "Metasploit Framework",
    description:
      "Metasploit is a widely used penetration testing framework that provides exploits, payloads, scanners, and post-exploitation modules. It enables structured offensive workflows and rapid testing of vulnerabilities.",
    whyUseful:
      "Teaches how exploitation frameworks work, how modules are structured, and how attackers chain vulnerabilities.",
    difficulty: "Intermediate",
    tags: ["Exploitation", "Post-Exploitation", "Framework"],
    url: "https://www.metasploit.com/",
    githubUrl: "https://github.com/rapid7/metasploit-framework",
  },
  {
    name: "Cobalt Strike (Community Alternatives: Sliver, Havoc)",
    description:
      "Cobalt Strike is a commercial red team platform for command-and-control, lateral movement, and post-exploitation. Open-source alternatives like Sliver and Havoc provide similar capabilities for learning.",
    whyUseful:
      "Shows how adversaries maintain persistence, move laterally, and coordinate multi-host operations.",
    difficulty: "Advanced",
    tags: ["C2", "Lateral Movement", "Post-Exploitation"],
    url: "https://www.cobaltstrike.com/",
    docsUrl: "https://www.cobaltstrike.com/help",
  },
  {
    name: "BloodHound",
    description:
      "BloodHound maps Active Directory relationships using graph theory to identify attack paths, privilege escalation routes, and misconfigurations. It visualizes complex AD environments.",
    whyUseful:
      "Critical for understanding how attackers abuse AD trust relationships and privilege inheritance.",
    difficulty: "Intermediate",
    tags: ["Active Directory", "Graph", "Privilege Escalation"],
    url: "https://bloodhound.readthedocs.io/",
    githubUrl: "https://github.com/BloodHoundAD/BloodHound",
  },
  {
    name: "Impacket",
    description:
      "Impacket is a collection of Python tools for working with network protocols like SMB, LDAP, and Kerberos. It includes scripts for credential abuse, lateral movement, and enumeration.",
    whyUseful:
      "Shows how attackers abuse Windows protocols and authentication flows during internal engagements.",
    difficulty: "Advanced",
    tags: ["SMB", "Kerberos", "Lateral Movement"],
    url: "https://github.com/fortra/impacket",
    githubUrl: "https://github.com/fortra/impacket",
  },
  {
    name: "Responder",
    description:
      "Responder is a tool for poisoning LLMNR, NBT-NS, and MDNS to capture hashes and credentials on internal networks. It is commonly used in internal penetration tests.",
    whyUseful:
      "Teaches how legacy protocols expose organizations to credential theft and relay attacks.",
    difficulty: "Intermediate",
    tags: ["LLMNR", "NBT-NS", "Credential Theft"],
    url: "https://github.com/lgandx/Responder",
    githubUrl: "https://github.com/lgandx/Responder",
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

export default function RedTeamPage() {
  return (
    <Layout
      title="Red Team Tools"
      description="Offensive security tools for exploitation, C2, and post-exploitation."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Red Team Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Red team tools simulate adversary behavior, focusing on exploitation, lateral movement,
          persistence, and command-and-control. These tools help security professionals understand
          attacker workflows and test organizational defenses.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {redTeamTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}