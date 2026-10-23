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

const containerTools: Tool[] = [
  {
    name: "Trivy",
    description:
      "Trivy is a comprehensive vulnerability and misconfiguration scanner for containers, Kubernetes, filesystems, and Git repositories. It detects CVEs, secrets, IaC issues, and compliance violations with minimal setup.",
    whyUseful:
      "Perfect for learning how container images accumulate vulnerabilities and how DevSecOps teams integrate scanning into CI/CD pipelines.",
    difficulty: "Beginner",
    tags: ["Scanning", "Containers", "CI/CD"],
    url: "https://aquasecurity.github.io/trivy/",
    githubUrl: "https://github.com/aquasecurity/trivy",
  },
  {
    name: "Falco",
    description:
      "Falco is a runtime security tool for containers and Kubernetes. It monitors system calls and detects suspicious behavior such as privilege escalation, unexpected network activity, or file modifications.",
    whyUseful:
      "Shows how real-time detection works inside containerized environments and how behavioral rules catch attacks.",
    difficulty: "Advanced",
    tags: ["Runtime Security", "Kubernetes", "Detection"],
    url: "https://falco.org/",
    githubUrl: "https://github.com/falcosecurity/falco",
  },
  {
    name: "Anchore Engine",
    description:
      "Anchore Engine performs deep container image analysis, scanning for vulnerabilities, policy violations, and insecure configurations. It integrates with CI/CD systems and supports custom policies.",
    whyUseful:
      "Teaches how enterprise-grade container scanning enforces security standards across large environments.",
    difficulty: "Intermediate",
    tags: ["Scanning", "Policy", "Containers"],
    url: "https://anchore.com/opensource/",
    githubUrl: "https://github.com/anchore/anchore-engine",
  },
  {
    name: "Kube-Bench",
    description:
      "Kube-Bench checks Kubernetes clusters against the CIS Kubernetes Benchmark. It evaluates control plane components, worker nodes, and configuration files for security compliance.",
    whyUseful:
      "Helps learners understand Kubernetes hardening and how misconfigurations expose clusters to attacks.",
    difficulty: "Intermediate",
    tags: ["Kubernetes", "Compliance", "CIS"],
    url: "https://github.com/aquasecurity/kube-bench",
    githubUrl: "https://github.com/aquasecurity/kube-bench",
  },
  {
    name: "Kube-Hunter",
    description:
      "Kube-Hunter identifies security issues in Kubernetes clusters by performing passive and active probing. It detects common misconfigurations, exposed services, and insecure components.",
    whyUseful:
      "Shows how attackers enumerate Kubernetes environments and how defenders identify weak points.",
    difficulty: "Intermediate",
    tags: ["Kubernetes", "Scanning", "Recon"],
    url: "https://github.com/aquasecurity/kube-hunter",
    githubUrl: "https://github.com/aquasecurity/kube-hunter",
  },
];

export default function ContainerSecurityPage() {
  return (
    <Layout
      title="Container Security Tools"
      description="Tools for securing containers, Kubernetes clusters, and cloud-native workloads."
    >
      <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>Container Security Tools</h1>

        <p style={{ color: "#aaa", marginBottom: "1.5rem" }}>
          Container security tools help secure Docker images, Kubernetes clusters, and cloud-native
          workloads. These tools support vulnerability scanning, runtime detection, compliance
          checks, and policy enforcement across modern containerized environments.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
          }}
        >
          {containerTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </main>
    </Layout>
  );
}