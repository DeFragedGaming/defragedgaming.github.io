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

const emailTools: Tool[] = [
  {
    name: "MXToolbox",
    description:
      "MXToolbox provides DNS, MX, SPF, DKIM, and blacklist lookups for email infrastructure. It helps diagnose deliverability issues and detect misconfigurations.",
    whyUseful:
      "Teaches how email authentication works and how attackers exploit weak DNS and mail server settings.",
    difficulty: "Beginner",
    tags: ["DNS", "SPF", "Email Security"],
    url: "https://mxtoolbox.com/",
  },
  {
    name: "DMARC Analyzer (Free Tools)",
    description:
      "DMARC Analyzer provides tools for validating DMARC, SPF, and DKIM configurations. It helps organizations enforce email authentication policies.",
    whyUseful:
      "Shows how DMARC protects domains from spoofing and phishing attacks.",
    difficulty: "Beginner",
    tags: ["DMARC", "SPF", "DKIM"],
    url: "https://www.dmarcanalyzer.com/",
  },
  {
    name: "GoPhish",
    description:
      "GoPhish is an open-source phishing simulation platform that allows organizations to test user awareness and train employees against phishing attacks.",
    whyUseful:
      "Helps learners understand phishing techniques and how awareness programs reduce risk.",
    difficulty: "Intermediate",
    tags: ["Phishing", "Training", "Awareness"],
    url: "https://getgophish.com/",
    githubUrl: "https://github.com/gophish/gophish",
  },
  {
    name: "SpamAssassin",
    description:
      "SpamAssassin is an open-source spam filtering platform that uses rules, heuristics, and machine learning to detect unwanted email.",
    whyUseful:
      "Shows how spam detection works and how attackers attempt to bypass filters.",
    difficulty: "Intermediate",
    tags: ["Spam", "Filtering", "Email"],
    url: "https://spamassassin.apache.org/",
  },
  {
    name: "MailHeader Analyzer",
    description:
      "MailHeader Analyzer tools decode and analyze email headers to reveal routing paths, authentication results, and potential spoofing indicators.",
    whyUseful:
      "Teaches how to trace email origins and identify forged or suspicious messages.",
    difficulty: "Beginner",
    tags: ["Headers", "Analysis", "Email"],
    url: "https://mha.azurewebsites.net/",
  },
];

export default function EmailSecurityPage() {
  return (
    <Layout
      title="Email Security Tools"
      description="Tools for securing email infrastructure, authentication, and phishing defense."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Email Security Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Email security tools help protect organizations from phishing, spoofing, spam, and
          misconfigurations. These tools support authentication standards like SPF, DKIM, and DMARC,
          and provide visibility into email routing and security posture.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {emailTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}