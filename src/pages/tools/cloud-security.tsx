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

const cloudTools: Tool[] = [
  {
    name: "ScoutSuite",
    description:
      "ScoutSuite is a multi-cloud security auditing tool that evaluates configurations across AWS, Azure, and GCP. It generates detailed reports highlighting misconfigurations, insecure defaults, and policy gaps.",
    whyUseful:
      "Helps learners understand cloud misconfigurations and how attackers exploit weak IAM, storage, and network settings.",
    difficulty: "Intermediate",
    tags: ["Audit", "AWS", "Azure", "GCP"],
    url: "https://github.com/nccgroup/ScoutSuite",
    githubUrl: "https://github.com/nccgroup/ScoutSuite",
  },
  {
    name: "Prowler",
    description:
      "Prowler is a cloud security tool focused on AWS, offering CIS benchmark checks, compliance validation, and security posture assessments. It supports multi-account scanning and detailed reporting.",
    whyUseful:
      "Teaches how compliance frameworks map to real cloud configurations and how to identify risky IAM policies.",
    difficulty: "Intermediate",
    tags: ["AWS", "Compliance", "CIS"],
    url: "https://github.com/prowler-cloud/prowler",
    githubUrl: "https://github.com/prowler-cloud/prowler",
  },
  {
    name: "CloudSploit",
    description:
      "CloudSploit scans cloud environments for misconfigurations and security risks. It supports AWS, Azure, and GCP and provides detailed findings with remediation guidance.",
    whyUseful:
      "Shows how automated scanning can quickly surface dangerous cloud settings that attackers commonly exploit.",
    difficulty: "Beginner",
    tags: ["Scanning", "Misconfigurations", "Multi-Cloud"],
    url: "https://github.com/aquasecurity/cloudsploit",
    githubUrl: "https://github.com/aquasecurity/cloudsploit",
  },
  {
    name: "Steampipe",
    description:
      "Steampipe allows querying cloud resources using SQL, enabling unified visibility across AWS, Azure, GCP, and SaaS platforms. It supports compliance packs and dashboards.",
    whyUseful:
      "Helps learners understand cloud inventory, resource relationships, and compliance through a familiar query language.",
    difficulty: "Intermediate",
    tags: ["SQL", "Inventory", "Compliance"],
    url: "https://steampipe.io/",
  },
  {
    name: "CloudMapper",
    description:
      "CloudMapper visualizes AWS environments, showing network paths, public exposure, and architecture relationships. It helps identify risky configurations and attack paths.",
    whyUseful:
      "Great for visual learners who want to understand cloud architecture and how attackers move laterally.",
    difficulty: "Intermediate",
    tags: ["Visualization", "AWS", "Mapping"],
    url: "https://github.com/duo-labs/cloudmapper",
    githubUrl: "https://github.com/duo-labs/cloudmapper",
  },
];

export default function CloudSecurityPage() {
  return (
    <Layout
      title="Cloud Security Tools"
      description="Tools for securing AWS, Azure, GCP, and cloud-native workloads."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Cloud Security Tools</h1>
        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Cloud security tools help identify misconfigurations, audit environments, and enforce
          compliance across AWS, Azure, GCP, and other cloud platforms. These tools support
          visibility, governance, and secure architecture design.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {cloudTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}